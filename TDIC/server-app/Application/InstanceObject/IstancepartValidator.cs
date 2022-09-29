using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.InstanceObject
{
    public class InstanceObjectValidator : AbstractValidator<t_instance_object>
    {
        public InstanceObjectValidator()
        {
        }
    }
    public class InstanceObjectUpdateUDtoValidator : AbstractValidator<t_instance_objectUpdateUDto>
    {
        public InstanceObjectUpdateUDtoValidator()
        {
        }
    }
}
