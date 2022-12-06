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
using TDIC.Models.VEDM;

namespace Application.Instruction
{
    public class resetInstanceActionClips
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id_article {get; set;}
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

                var modelActionSettinglist = new List<InstanceActionExecSetting>();
                
                var instpartlist = await _context.t_instance_objects
                                        .Include(t =>t.id_partNavigation)
                                        .Select(t=> new{
                                            id_article=t.id_article, 
                                            id_instance=t.id_instance, 
                                            id_part=t.id_part, 
                                            AnimationClip=t.id_partNavigation.AnimationClip})
                                        .Where(t => t.id_article == request.id_article)
                                        .ToListAsync(cancellationToken);

                    
                foreach (var inst in instpartlist)
                {
                    List<PartAnimationClipDtO> AnimationClipList = new List<PartAnimationClipDtO>();
                    try{
                        AnimationClipList = JsonSerializer.Deserialize<List<PartAnimationClipDtO>>(inst.AnimationClip);

                    } catch{
                        AnimationClipList = new List<PartAnimationClipDtO>();

                    }

                    foreach (var AnimationClip in AnimationClipList)
                    {
                        modelActionSettinglist.Add(new InstanceActionExecSetting{
                            id_instruct=0, 
                            id_instance=inst.id_instance, 
                            id_part=inst.id_part,
                            no=AnimationClip.no,
                            name=AnimationClip.name,
                            is_exec=false,
                            num_loop=1,
                            is_clamp_when_finished=true
                        });

                    }
                }
                
                   
                foreach (var instruction in instructions)
                {
                    foreach (var modelActionSetting in modelActionSettinglist){
                        modelActionSetting.id_instruct = instruction.id_instruct;
                    }
                    // Serialize Json to string without options
                    string json_str = JsonSerializer.Serialize(modelActionSettinglist);
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