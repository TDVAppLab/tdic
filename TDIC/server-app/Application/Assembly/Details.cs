using System;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using MediatR;
using TDIC.Models.EDM;

namespace Application.Assembly
{
    public class Details
    {

        public class Query : IRequest<Result<t_assembly>>{
            public long ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_assembly>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_assembly>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_assembly =  await _context.t_assemblies.FindAsync(request.ID);

                if(t_assembly==null) throw new Exception("t_assembly not found");

                return Result<t_assembly>.Success(t_assembly);
            }
        }
    }
}