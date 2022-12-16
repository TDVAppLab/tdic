using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Application.AttachmentFile
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id {get; set;}
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var t_attachment =  await _context.t_attachments.FindAsync(request.id);

                if(t_attachment == null) return null;
                
                _context.Remove(t_attachment);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete t_parts");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}