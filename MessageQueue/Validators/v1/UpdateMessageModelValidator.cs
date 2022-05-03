using System;
using MessageQueue.Models.v1;
using FluentValidation;

namespace MessageQueue.Validators.v1
{
    public class UpdateMessageModelValidator : AbstractValidator<UpdateMessageModel>
    {
        public UpdateMessageModelValidator()
        {
            //RuleFor(x => x.MessageDetails)
            //    .NotNull()
            //    .MinimumLength(2).
            //    WithMessage("Must be at least 2 character long");
            
            //RuleFor(x => x.QueueName)
            //    .NotNull()
            //    .MinimumLength(2)
            //    .WithMessage("Must be at least 2 character long");

            //RuleFor(x => x.CreatedDate)
            //    .InclusiveBetween(DateTime.Now.AddYears(-150).Date, DateTime.Now)
            //    .WithMessage("The date must not be longer ago than 150 years and can not be in the future");
                

        }
    }
}