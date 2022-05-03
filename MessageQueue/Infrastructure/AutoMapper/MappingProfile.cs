using AutoMapper;
using MessageQueue.Data.Entities;
using MessageQueue.Models.v1;

namespace MessageQueue.Infrastructure.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateMessageModel, Message>().ForMember(x => x.Row, opt => opt.Ignore());

            CreateMap<UpdateMessageModel, Message>();
}
    }
}
