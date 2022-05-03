using System;
using MessageQueue.Models.v1;
using FluentValidation;

namespace MessageQueue.Validators.v1
{
    public class CreateMessageModelValidator : AbstractValidator<CreateMessageModel>
    {
        public CreateMessageModelValidator()
        {
            RuleFor(x => x.QueueName)
                .NotNull()
                .WithMessage("Must be at least 2 character long");
            //RuleFor(x => x.MessageDetails)
            //    .MinimumLength(2).
            //    WithMessage("Must be at least 2 character long");
            
            //RuleFor(x => x.User)
            //    .NotNull()
            //    .WithMessage("Must be at least 2 character long");

            //RuleFor(x => x.CreatedDate)
            //    .InclusiveBetween(DateTime.Now.AddYears(-150).Date, DateTime.Now)
            //    .WithMessage("The date must not be longer ago than 150 years and can not be in the future");

        }
    }
}