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

namespace Application.Instruction
{

    public partial class InstanceDisplay {
        public long id_assy { get; set; }
        public long id_inst { get; set; }
        public bool isDisplay { get; set; }
    }

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

                //--------------------------------------------------------------------------------------
                //start create json

                var data = new List<InstanceDisplay>();
                
                long assyid = (await _context.t_articles.FindAsync(request.Instruction.id_article)).id_assy ?? 0;

                var instlist = await _context.t_instance_parts.Where(t => t.id_assy == assyid).ToListAsync();
                    
                foreach (var inst in instlist)
                {
                    data.Add(new InstanceDisplay{id_assy=inst.id_assy, id_inst=inst.id_inst, isDisplay=true});
                }
                // オプションを付けずにJson文字列に変換
                var json_str = JsonSerializer.Serialize(data);

                //end create json
                //--------------------------------------------------------------------------------------

                
                long id_instruct = 1 + (await _context.t_instructions.Where(t => t.id_article == request.Instruction.id_article)
                                        .MaxAsync(t => (long?)t.id_instruct) ?? 0);

                request.Instruction.id_instruct = id_instruct;

                request.Instruction.display_instance_sets = json_str;
                
                request.Instruction.create_user = "";
                request.Instruction.create_datetime = DateTime.Now;
                request.Instruction.latest_update_user = "";
                request.Instruction.latest_update_datetime = DateTime.Now;


                //instructionに一致するannotation displayを作る

                await _context.t_instructions.AddAsync(request.Instruction);

                

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

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_instruction>.Failure("Failed to create task");

//                var ans = request.Instruction;




                return Result<t_instruction>.Success(await _context.t_instructions.FindAsync(request.Instruction.id_article, request.Instruction.id_instruct));
//                return Result<t_instruction>.Success(request.Instruction);
            }
        }

    }

}