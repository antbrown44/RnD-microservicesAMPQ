using System;
using MessageQueue.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace MessageQueue.Data.Database
{
    public class MessageContext : DbContext
    {
        public MessageContext()
        {
        }

        public MessageContext(DbContextOptions<MessageContext> options)
            : base(options)
        {
            //var messages = new[]
            //{
            //    new Message
            //    {
            //        Id = Guid.Parse("9f35b48d-cb87-4783-bfdb-21e36012930a"),
            //        QueueName = "CDSQueue",
            //        User = "Test User",
            //        IsInternal = 1,
            //        MessageDetails = "Test Message 1",
            //        Subject = "none",
            //        CreatedDate = new DateTime(1989, 11, 23)
            //    },
            //    new Message
            //    {
            //        Id = Guid.Parse("9f55b48d-cb87-4783-bfdb-21e36012930a"),
            //        QueueName = "CDSQueue",
            //        User = "Test User",
            //        IsInternal = 1,
            //        MessageDetails = "Test Message 2",
            //        Subject = "none",
            //        CreatedDate = new DateTime(1989, 11, 23)
            //    },
            //    new Message
            //    {
            //        Id = Guid.Parse("9f22b48d-cb87-4783-bfdb-21e36012930a"),
            //        QueueName = "CDSQueue",
            //        User = "Test User",
            //        IsInternal = 1,
            //        MessageDetails = "Test Message 3",
            //        Subject = "none",
            //        CreatedDate = new DateTime(1989, 11, 23)
            //    }
            //};

            //Message.AddRange(messages);
            //SaveChanges();
        }

        public DbSet<Message> Message { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Message>(entity =>
            {
                //entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                //entity.Property(e => e.CreatedDate).HasColumnType("date");

                //entity.Property(e => e.MessageDetails).IsRequired();

                //entity.Property(e => e.IsInternal).IsRequired();
            });
        }
    }
}
