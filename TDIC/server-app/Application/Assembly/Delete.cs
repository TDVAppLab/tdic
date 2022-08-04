using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Application.Assembly
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public long id {get; set;}
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
                var t_assembly =  await _context.t_assemblies.FindAsync(request.id);

                if(t_assembly == null) return null;
                
                _context.Remove(t_assembly);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete t_assembly");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}