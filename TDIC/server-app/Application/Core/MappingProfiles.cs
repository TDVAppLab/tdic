using AutoMapper;
using TDIC.DTOs;
using TDIC.Models.EDM;

namespace TDIC.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //t_website_setting
            CreateMap<t_article, t_article>();
            CreateMap<t_articleUpdateUDto, t_article>();

            //t_annotation
            CreateMap<t_annotation, t_annotation>();
            CreateMap<t_annotationUpdateUDto, t_annotation>();

            //t_assembly
            CreateMap<t_assembly, t_assembly>();
            CreateMap<t_assemblyUpdateUDto, t_assembly>();



            CreateMap<t_attachment, t_attachment>();
            CreateMap<t_instruction, t_instruction>();



            //t_website_setting
            CreateMap<t_website_setting, t_website_setting>();
            CreateMap<t_website_settingUpdateUDto, t_website_setting>();
        }
    }
}