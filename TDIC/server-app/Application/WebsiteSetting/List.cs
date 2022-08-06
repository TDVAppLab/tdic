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

namespace Application.WebsiteSetting
{
    public class List
    {
        public class Query : IRequest<Result<List<t_website_setting>>>{
        }

        public class Handler : IRequestHandler<Query, Result<List<t_website_setting>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<t_website_setting>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<t_website_setting>>
                    .Success(await _context.t_website_settings.ToListAsync(cancellationToken));
            }
        }
    }
}