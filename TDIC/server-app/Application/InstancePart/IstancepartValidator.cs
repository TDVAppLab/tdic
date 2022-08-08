using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.Instancepart
{
    public class InstancepartValidator : AbstractValidator<t_instance_part>
    {
        public InstancepartValidator()
        {
        }
    }
    public class InstancepartUpdateUDtoValidator : AbstractValidator<t_instance_partUpdateUDto>
    {
        public InstancepartUpdateUDtoValidator()
        {
        }
    }
}
