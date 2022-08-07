using AutoMapper;
using TDIC.DTOs;
using TDIC.Models.EDM;

namespace TDIC.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<t_attachment, t_attachment>();
            CreateMap<t_instruction, t_instruction>();

            //t_website_setting
            CreateMap<t_website_setting, t_website_setting>();
            CreateMap<t_website_settingUpdateUDto, t_website_setting>();
        }
    }
}