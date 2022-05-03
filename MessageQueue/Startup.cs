using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using MessageQueue.Data.Database;
using MessageQueue.Data.Entities;
using MessageQueue.Data.Repository.v1;
using MessageQueue.Infrastructure.Prometheus;
using MessageQueue.Messaging.Send.Options.v1;
using MessageQueue.Messaging.Send.Sender;
using MessageQueue.Messaging.Send.Sender.v1;
using MessageQueue.Models.v1;
using MessageQueue.Service.v1.Command;
using MessageQueue.Service.v1.Query;
using MessageQueue.Validators.v1;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Prometheus;

namespace MessageQueue
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHealthChecks();
            services.AddOptions();

            var serviceClientSettingsConfig = Configuration.GetSection("RabbitMq");
            services.Configure<RabbitMqConfiguration>(serviceClientSettingsConfig);

            serviceClientSettingsConfig = Configuration.GetSection("AzureServiceBus");
            services.Configure<AzureServiceBusConfiguration>(serviceClientSettingsConfig);

            bool.TryParse(Configuration["BaseServiceSettings:UseInMemoryDatabase"], out var useInMemory);

            if (!useInMemory)
            {
                services.AddDbContext<MessageContext>(options =>
                {
                    options.UseSqlServer(Configuration.GetConnectionString("MessageDatabase"));
                });
            }
            else
            {
                //services.AddDbContext<MessageContext>(options => options.UseInMemoryDatabase(Guid.NewGuid().ToString()));
                services.AddDbContext<MessageContext>(options => options.UseInMemoryDatabase("MessageDatabase"));
            }

            services.AddAutoMapper(typeof(Startup));

            services.AddMvc().AddFluentValidation();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Messaging Api",
                    Description = "API to send or recieve messages (RabbitMQ)",
                    Contact = new OpenApiContact
                    {
                        Name = "Anthony Brown",
                        Email = "ajb@cds-systems.co.uk",
                        Url = new Uri("https://www.codas.com/")
                    }
                });
            });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var actionExecutingContext =
                        actionContext as ActionExecutingContext;

                    if (actionContext.ModelState.ErrorCount > 0
                        && actionExecutingContext?.ActionArguments.Count == actionContext.ActionDescriptor.Parameters.Count)
                    {
                        return new UnprocessableEntityObjectResult(actionContext.ModelState);
                    }

                    return new BadRequestObjectResult(actionContext.ModelState);
                };
            });

            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IMessageRepository, MessageRepository>();

            services.AddTransient<IValidator<CreateMessageModel>, CreateMessageModelValidator>();
            services.AddTransient<IValidator<UpdateMessageModel>, UpdateMessageModelValidator>();

            bool.TryParse(Configuration["BaseServiceSettings:UserabbitMq"], out var useRabbitMq);

            if (useRabbitMq)
            {
                services.AddSingleton<IMessageUpdateSender, MessageUpdateSender>();
                services.AddSingleton<IMessageSender, MessageSender>();
            }
            else
            {
                services.AddSingleton<IMessageUpdateSender, MessageUpdateSenderServiceBus>();
            }

            services.AddTransient<IRequestHandler<CreateMessageCommand, Message>, CreateMessageCommandHandler>();
            services.AddTransient<IRequestHandler<UpdateMessageCommand, Message>, UpdateMessageCommandHandler>();
            services.AddTransient<IRequestHandler<GetMessageByIdQuery, Message>, GetMessageByIdQueryHandler>();
            services.AddTransient<IRequestHandler<GetMessageQuery, List<Message>>, GetMessageQueryHandler>();

            services.AddSingleton<MetricCollector>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseHttpsRedirection();
            }
            
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Messaging API V1");
                c.RoutePrefix = string.Empty;
            });
            app.UseRouting();
            
            app.UseMetricServer();
            app.UseMiddleware<ResponseMetricMiddleware>();
            app.UseHttpMetrics();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
            });
        }
    }
}
