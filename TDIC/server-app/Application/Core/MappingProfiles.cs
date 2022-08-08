using AutoMapper;
using TDIC.DTOs;
using TDIC.Models.EDM;

namespace TDIC.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //t_article
            CreateMap<t_article, t_article>();
            CreateMap<t_articleUpdateUDto, t_article>();

            //t_annotation
            CreateMap<t_annotation, t_annotation>();
            CreateMap<t_annotationUpdateUDto, t_annotation>();

            //t_assembly
            CreateMap<t_assembly, t_assembly>();
            CreateMap<t_assemblyUpdateUDto, t_assembly>();



            //t_attachment
            CreateMap<t_attachment, t_attachment>();
            CreateMap<t_attachmentUpdateUDto, t_attachment>();

            
            //t_instance_part
            CreateMap<t_instance_part, t_instance_part>();
            CreateMap<t_instance_partUpdateUDto, t_instance_part>();

            
            //t_instruction
            CreateMap<t_instruction, t_instruction>();
            CreateMap<t_instructionUpdateUDto, t_instruction>();


            //t_light
            CreateMap<t_light, t_light>();
            CreateMap<t_lightUpdateUDto, t_light>();
            
            //t_part
            CreateMap<t_part, t_part>();
            CreateMap<t_partUpdateUDto, t_part>();

            //t_website_setting
            CreateMap<t_website_setting, t_website_setting>();
            CreateMap<t_website_settingUpdateUDto, t_website_setting>();
        }
    }
}