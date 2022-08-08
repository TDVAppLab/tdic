using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.Instruction
{
    public class InstructionValidator : AbstractValidator<t_instruction>
    {
        public InstructionValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
    public class InstructionUpdateUDtoValidator : AbstractValidator<t_instructionUpdateUDto>
    {
        public InstructionUpdateUDtoValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}