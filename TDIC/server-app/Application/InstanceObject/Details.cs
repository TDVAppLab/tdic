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

namespace Application.InstanceObject
{
    public class Details
    {
        public class Query : IRequest<Result<t_instance_object>>{
            public Guid id_article {get; set;}
            public long id_instance {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_instance_object>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }
            

            public async Task<Result<t_instance_object>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_instance_object =  await _context.t_instance_objects.FindAsync(request.id_article,request.id_instance);

                if(t_instance_object==null) throw new Exception("t_instance_object not found");

                return Result<t_instance_object>.Success(t_instance_object);
            }
        }
    }
}