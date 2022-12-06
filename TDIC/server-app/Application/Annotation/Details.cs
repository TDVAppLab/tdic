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

namespace Application.Annotation
{
    public class Details
    {
        public class Query : IRequest<Result<t_annotation>>{
            public string id_article {get; set;}
            public long id_annotation {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_annotation>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }           
            public async Task<Result<t_annotation>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_annotation =  await _context.t_annotations.FindAsync(request.id_article,request.id_annotation);

                if(t_annotation==null) throw new Exception("t_annotation not found");

                return Result<t_annotation>.Success(t_annotation);
            }
        }
    }
}