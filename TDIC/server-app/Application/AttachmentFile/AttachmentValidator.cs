using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.AttachmentFile
{
    public class AttachmentValidator : AbstractValidator<t_attachment>
    {
        public AttachmentValidator()
        {
        }
    }
    public class AttachmentUpdateUDtoValidator : AbstractValidator<t_attachmentUpdateUDto>
    {
        public AttachmentUpdateUDtoValidator()
        {
        }
    }
}
