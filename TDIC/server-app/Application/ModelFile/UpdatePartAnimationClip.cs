using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TDIC.Models.EDM;
using TDIC.Application.Core;
using TDIC.DTOs;
using System.Linq;
using System.Text.Json;

namespace Application.ModelFile
{
    public class UpdatePartAnimationClip
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id_part {get; set;}
            public IList<PartAnimationClipDtO> PartAnimationClips {get; set;}
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly db_data_coreContext _context;
        private readonly IMapper _mapper;
            public Handler(db_data_coreContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var t_part =  
                    await _context.t_parts
                        .Where(x => x.id_part == request.id_part)
                        .FirstOrDefaultAsync();


                if(t_part == null) return null;

                
                // オプションを付けずにJson文字列に変換
                string json_str = JsonSerializer.Serialize(request.PartAnimationClips);
                t_part.AnimationClip = json_str;

                t_part.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update AnimationClip");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}