using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;





namespace Application.Instancepart
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public long id_assy {get; set;}
            public long id_inst {get; set;}
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
                var t_instance_part =  await _context.t_instance_parts.FindAsync(request.id_assy, request.id_inst);

                if(t_instance_part == null) return null;
                
                _context.Remove(t_instance_part);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete t_instance_part");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}