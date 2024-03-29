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
using TDIC.DTOs;

namespace Application.ModelFile
{
    public class List
    {
        public class Query : IRequest<Result<List<t_partListDto>>>{
            public bool is_exclude_used {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<t_partListDto>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<t_partListDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                return Result<List<t_partListDto>>
                    .Success(
                        await _context.t_parts
                        .Include(t => t.t_instance_objects)
                        .Select(x => new t_partListDto(){                        
                            id_part = x.id_part,
                            part_number = x.part_number,
                            version = x.version,
                            type_data = x.type_data,
                            format_data = x.format_data,
                            file_name = x.file_name,
                            file_length = x.file_length,
                            itemlink = x.itemlink,
                            license = x.license,
                            author = x.author,
                            memo = x.memo,
                            create_datetime = x.create_datetime,
                            latest_update_datetime = x.latest_update_datetime,
                            count_use_instance = x.t_instance_objects.Count,
                            article_references = x.t_instance_objects.Where(z=>z.id_part==x.id_part).Select(y => new article_reference{id_article = y.id_articleNavigation.id_article, title = y.id_articleNavigation.title, status_name = y.id_articleNavigation.statusNavigation.name})
                        })
                        .Where(x => request.is_exclude_used ? x.count_use_instance < 1 : true )
                        .OrderByDescending(t => t.create_datetime)
                        .ToListAsync(cancellationToken));
            }
        }
    }
}