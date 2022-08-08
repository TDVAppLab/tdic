using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.WebsiteSetting
{
    public class WebsiteSettingValidator : AbstractValidator<t_website_setting>
    {
        public WebsiteSettingValidator()
        {
        }
    }
    public class WebsiteSettingUpdateDtoValidator : AbstractValidator<t_website_settingUpdateUDto>
    {
        public WebsiteSettingUpdateDtoValidator()
        {
        }
    }
}


