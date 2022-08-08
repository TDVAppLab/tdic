using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.View
{
    public class ViewValidator : AbstractValidator<t_view>
    {
        public ViewValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
    public class ViewUpdateUDtoValidator : AbstractValidator<t_viewUpdateUDto>
    {
        public ViewUpdateUDtoValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}