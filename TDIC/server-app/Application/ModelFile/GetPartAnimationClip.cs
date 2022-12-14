using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TDIC.DTOs;
using System.Text.Json;

namespace Application.ModelFile
{
    public class GetPartAnimationClip
    {
        public class Query : IRequest<Result<List<PartAnimationClipDtO>>>{
            public Guid ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<PartAnimationClipDtO>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<PartAnimationClipDtO>>> Handle(Query request, CancellationToken cancellationToken)
            {

                
                var t_part =  
                    await _context.t_parts
                        .Where(x => x.id_part == request.ID)
                        .Select(x => new t_part(){                        
                            id_part = x.id_part,
                            AnimationClip = x.AnimationClip,}).FirstOrDefaultAsync();


                if(t_part == null) return null;

                List<PartAnimationClipDtO> ans = new List<PartAnimationClipDtO>();
                try{
                    ans = JsonSerializer.Deserialize<List<PartAnimationClipDtO>>(t_part.AnimationClip);

                } catch{
                    ans = new List<PartAnimationClipDtO>();

                }

                return Result<List<PartAnimationClipDtO>>.Success(ans);
            }
        }
    }
}