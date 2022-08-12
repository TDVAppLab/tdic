using System;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using MediatR;
using TDIC.Models.EDM;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application.ModelFile
{
    public class Details
    {

        public class Query : IRequest<Result<t_part>>{
            public long ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_part>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_part>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_part =  
                    await _context.t_parts
                        .Where(x => x.id_part == request.ID)
                        .Select(x => new t_part(){                        
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
                            latest_update_datetime = x.latest_update_datetime
                        })
                        .FirstOrDefaultAsync();

                if(t_part==null) throw new Exception("t_part not found");

                return Result<t_part>.Success(t_part);
            }
        }
    }
}