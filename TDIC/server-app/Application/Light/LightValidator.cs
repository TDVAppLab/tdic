using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.Light
{
    public class LightValidator : AbstractValidator<t_light>
    {
        public LightValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
    public class LightUpdateUDtoValidator : AbstractValidator<t_lightUpdateUDto>
    {
        public LightUpdateUDtoValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}