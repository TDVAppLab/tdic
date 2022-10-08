using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using System.Collections.Generic;
using System.Text.Json;
using TDIC.DTOs;
using TDIC.Models.VEDM;

namespace Application.Instruction
{

    public class Create
    {
        public class Command : IRequest<Result<t_instruction>>{
            public t_instruction Instruction {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Instruction).SetValidator(new InstructionValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<t_instruction>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_instruction>> Handle(Command request, CancellationToken cancellationToken)
            {
                
                long id_instruct = 1 + (await _context.t_instructions.Where(t => t.id_article == request.Instruction.id_article)
                                        .MaxAsync(t => (long?)t.id_instruct) ?? 0);

                request.Instruction.id_instruct = id_instruct;
                
                request.Instruction.create_user = "";
                request.Instruction.create_datetime = DateTime.Now;
                request.Instruction.latest_update_user = "";
                request.Instruction.latest_update_datetime = DateTime.Now;



                //--------------------------------------------------------------------------------------
                //start create json                

                var InstanceObjectDisplays = new List<InstanceObjectDisplay>();
                
                var instobjectlist = await _context.t_instance_objects.Include(t =>t.id_partNavigation).Where(t => t.id_article == request.Instruction.id_article).ToListAsync(cancellationToken);
                    
                foreach (var inst in instobjectlist)
                {
                    InstanceObjectDisplays.Add(new InstanceObjectDisplay{id_instance=inst.id_instance, isDisplay=true});
                }
                request.Instruction.display_instance_sets = JsonSerializer.Serialize(InstanceObjectDisplays);
                
                //createInstanceActionClips json
                //====================================================================================
                

                var modelActionSettinglist = new List<InstanceActionExecSetting>();

                    
                foreach (var inst in instobjectlist)
                {
                    List<PartAnimationClipDtO> AnimationClipList = new List<PartAnimationClipDtO>();
                    try{
                        AnimationClipList = JsonSerializer.Deserialize<List<PartAnimationClipDtO>>(inst.id_partNavigation.AnimationClip);

                    } catch{
                        AnimationClipList = new List<PartAnimationClipDtO>();

                    }

                    foreach (var AnimationClip in AnimationClipList)
                    {
                        modelActionSettinglist.Add(new InstanceActionExecSetting{
                            id_instruct=id_instruct, 
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

                request.Instruction.model_action_settings = JsonSerializer.Serialize(modelActionSettinglist);
                //====================================================================================


                await _context.t_instructions.AddAsync(request.Instruction);
                
                //instructionに一致するannotation displayを作る
                //====================================================================================


                

                var annotation_displays = new List<t_annotation_display>();
                
                var annotations = await _context.t_annotations.Where(t => t.id_article == request.Instruction.id_article).ToListAsync();

                if(annotations.Count>0){

                    foreach (var item in annotations)
                    {
                        annotation_displays.Add(new t_annotation_display
                            {
                                id_article=item.id_article, 
                                id_instruct=id_instruct, 
                                id_annotation=item.id_annotation, 
                                is_display=false, 
                                is_display_description=false, 
                                create_user="", 
                                create_datetime=null, 
                                latest_update_user="", 
                                latest_update_datetime=null});
                    }                    
                    await _context.t_annotation_displays.AddRangeAsync(annotation_displays);
                }
                //====================================================================================


                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_instruction>.Failure("Failed to create instruction");

                return Result<t_instruction>.Success(await _context.t_instructions.FindAsync(request.Instruction.id_article, request.Instruction.id_instruct));
            }
        }

    }

}