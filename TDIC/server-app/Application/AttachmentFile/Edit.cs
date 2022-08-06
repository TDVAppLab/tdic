using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TDIC.Models.EDM;
using TDIC.Application.Core;

namespace Application.AttachmentFile
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public t_attachment t_attachment {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.t_attachment).SetValidator(new AttachmentValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly db_data_coreContext _context;
        private readonly IMapper _mapper;
            public Handler(db_data_coreContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var t_attachment = await _context.t_attachments.FindAsync(request.t_attachment.id_file);

                if(t_attachment == null) return null;

                //_mapper.Map(request.Instruction, instruction);

                //automapperの修正方法が分からないので、暫定的に直書きする
                t_attachment.name=request.t_attachment.name;                
//                t_attachment.type_data=request.t_attachment.type_data;
                t_attachment.format_data=request.t_attachment.format_data;
//                t_attachment.file_name=request.t_attachment.file_name;

//                t_attachment.file_length=request.t_attachment.file_length;

                t_attachment.itemlink=request.t_attachment.itemlink;
                t_attachment.license=request.t_attachment.license;

                t_attachment.memo=request.t_attachment.memo;
                t_attachment.isActive=request.t_attachment.isActive;


//                t_attachment.create_user=request.t_attachment.create_user;
//                t_attachment.create_datetime=request.t_attachment.create_datetime;


//                t_attachment.latest_update_user=request.t_attachment.latest_update_user;
                t_attachment.latest_update_datetime=DateTime.Now;

                
                t_attachment.target_article_id=request.t_attachment.target_article_id;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}