using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TDIC.Models.EDM;
using TDIC.Application.Core;
using TDIC.DTOs;
using System.Linq;
using System.Text.Json;

namespace Application.Instruction
{
    public class resetInstanceActionClips
    {
        public class Command : IRequest<Result<Unit>>
        {
            public long id_article {get; set;}
        }
        /*
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Instruction).SetValidator(new InstructionUpdateUDtoValidator());
            }
        }*/
        
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
                var instructions = await _context.t_instructions.Where(x => x.id_article == request.id_article).ToListAsync();

                if(instructions == null) return null;
                
                //--------------------------------------------------------------------------------------
                //start create json

                var data = new List<InstanceActionExecSettingDtO>();
                
                long assyid = (await _context.t_articles.FindAsync(request.id_article)).id_assy ?? 0;

                
                var instpartlist = await _context.t_instance_parts
                                        .Include(t =>t.id_partNavigation)
                                        .Select(t=> new{
                                            id_assy=t.id_assy, 
                                            id_inst=t.id_inst, 
                                            id_part=t.id_part, 
                                            AnimationClip=t.id_partNavigation.AnimationClip})
                                        .Where(t => t.id_assy == assyid)
                                        .ToListAsync(cancellationToken);

                    
                foreach (var inst in instpartlist)
                {
                    List<PartAnimationClipDtO> AnimationClipList = new List<PartAnimationClipDtO>();
                    try{
                        AnimationClipList = JsonSerializer.Deserialize<List<PartAnimationClipDtO>>(inst.AnimationClip);

                    } catch{
                        AnimationClipList = new List<PartAnimationClipDtO>();

                    }

                    foreach (var xxx in AnimationClipList)
                    {
                        data.Add(new InstanceActionExecSettingDtO{
                            id_assy=inst.id_assy, 
                            id_inst=inst.id_inst, 
                            id_part=inst.id_part,
                            no=xxx.no,
                            name=xxx.name,
                            is_exec=false,
                            num_loop=1,
                            is_clamp_when_finished=true
                        });

                    }
                }
                
                // Serialize Json to string without options
                string json_str = JsonSerializer.Serialize(data);
                   
                foreach (var instruction in instructions)
                {
                    instruction.model_action_settings = json_str;
                    instruction.latest_update_datetime = DateTime.Now;
                }

                //end create json
                //--------------------------------------------------------------------------------------



                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}