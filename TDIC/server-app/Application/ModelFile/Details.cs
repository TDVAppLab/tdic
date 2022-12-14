using System;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using MediatR;
using TDIC.Models.EDM;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TDIC.DTOs;

namespace Application.ModelFile
{
    public class Details
    {

        public class Query : IRequest<Result<t_partListDto>>{
            public Guid ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_partListDto>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_partListDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_part =  
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
                            .Where(x => x.id_part == request.ID)
                            .FirstOrDefaultAsync(cancellationToken);

                if(t_part==null) throw new Exception("t_part not found");

                return Result<t_partListDto>.Success(t_part);
            }
        }
    }
}