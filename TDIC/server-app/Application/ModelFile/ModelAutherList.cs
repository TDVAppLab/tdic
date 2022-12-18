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
    public class ModelAutherList
    {
        public class Query : IRequest<Result<List<t_partListDto>>>{
            public Guid id {get; set;}
            public bool IsAuthenticated {get; set;}            
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
                var instancelist = _context.t_instance_objects.Include(t => t.id_articleNavigation.statusNavigation).Where(x=>x.id_article == request.id);


                if(!request.IsAuthenticated){
                    instancelist = instancelist.Where(x=>x.id_articleNavigation.statusNavigation.is_approved == true);
                }



                var anslist= await instancelist
                        .Select(x => new t_partListDto(){                        
                            id_part = x.id_partNavigation.id_part,
                            part_number = x.id_partNavigation.part_number,
                            version = x.id_partNavigation.version,
                            type_data = x.id_partNavigation.type_data,
                            format_data = x.id_partNavigation.format_data,
                            file_name = x.id_partNavigation.file_name,
                            file_length = x.id_partNavigation.file_length,
                            itemlink = x.id_partNavigation.itemlink,
                            license = x.id_partNavigation.license,
                            author = x.id_partNavigation.author,
                            memo = x.id_partNavigation.memo,
                            create_datetime = x.create_datetime,
                            latest_update_datetime = x.latest_update_datetime,
                            count_use_instance = 0,
                        })
                        .OrderByDescending(t => t.create_datetime)
                        .ToListAsync(cancellationToken);



                return Result<List<t_partListDto>>
                    .Success(anslist);
            }
        }
    }
}