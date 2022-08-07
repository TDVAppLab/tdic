using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.Assembly
{
    public class AssemblyValidator : AbstractValidator<t_assembly>
    {
        public AssemblyValidator()
        {
        }
    }
    public class AssemblyUpdateUDtoValidator : AbstractValidator<t_assemblyUpdateUDto>
    {
        public AssemblyUpdateUDtoValidator()
        {
        }
    }
}
