using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.ModelFile
{
    public class PartValidator : AbstractValidator<t_part>
    {
        public PartValidator()
        {
        }
    }
    public class PartUpdateUDtoValidator : AbstractValidator<t_partUpdateUDto>
    {
        public PartUpdateUDtoValidator()
        {
        }
    }
}
