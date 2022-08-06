using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;

namespace Application.WebsiteSetting
{
    public class WebsiteSettingValidator : AbstractValidator<t_website_setting>
    {
        public WebsiteSettingValidator()
        {
        }
    }
}
