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
            CreateMap<t_articleScreenInfoUpdateDto, t_article>();

            //t_annotation
            CreateMap<t_annotation, t_annotation>();
            CreateMap<t_annotationUpdateUDto, t_annotation>();



            //t_attachment
            CreateMap<t_attachment, t_attachment>();
            CreateMap<t_attachmentUpdateUDto, t_attachment>();
            
            //t_instance_object
            CreateMap<t_instance_object, t_instance_object>();
            CreateMap<t_instance_objectUpdateUDto, t_instance_object>();

            
            //t_instruction
            CreateMap<t_instruction, t_instruction>();
            CreateMap<t_instructionUpdateUDto, t_instruction>();


            //t_light
            CreateMap<t_light, t_light>();
            CreateMap<t_lightUpdateUDto, t_light>();
            
            //t_part
            CreateMap<t_part, t_part>();
            CreateMap<t_partUpdateUDto, t_part>();
            
            //t_view
            CreateMap<t_view, t_view>();
            CreateMap<t_viewUpdateUDto, t_view>();

            //t_website_setting
            CreateMap<t_website_setting, t_website_setting>();
            CreateMap<t_website_settingUpdateUDto, t_website_setting>();
        }
    }
}