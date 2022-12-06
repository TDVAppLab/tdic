using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Light
{
    public class Details
    {
        public class Query : IRequest<Result<t_light>>{
            public string id_article {get; set;}
            public long id_light {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_light>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }
            public async Task<Result<t_light>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_light =  await _context.t_lights.FindAsync(request.id_article,request.id_light);

                if(t_light==null) throw new Exception("t_light not found");

                return Result<t_light>.Success(t_light);
            }
        }
    }
}