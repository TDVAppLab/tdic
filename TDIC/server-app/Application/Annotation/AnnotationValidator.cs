using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.Annotation
{
    public class AnnotationValidator : AbstractValidator<t_annotation>
    {
        public AnnotationValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
    public class AnnotationUpdateUDtoValidator : AbstractValidator<t_annotationUpdateUDto>
    {
        public AnnotationUpdateUDtoValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}




