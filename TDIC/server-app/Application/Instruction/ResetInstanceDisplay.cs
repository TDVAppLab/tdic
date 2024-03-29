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
    public class ResetInstanceDisplay
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

                var data = new List<InstanceObjectDisplay>();

                var instlist = await _context.t_instance_objects.Where(t => t.id_article == request.id_article).ToListAsync();
                    
                foreach (var inst in instlist)
                {
                    data.Add(new InstanceObjectDisplay{id_instance=inst.id_instance, isDisplay=true});
                }
                
                // オプションを付けずにJson文字列に変換
                string json_str = JsonSerializer.Serialize(data);
                   
                foreach (var instruction in instructions)
                {
                    instruction.display_instance_sets = json_str;
                    instruction.latest_update_datetime = DateTime.Now;
                }

                //end create json
                //--------------------------------------------------------------------------------------


                //_mapper.Map(request.Instruction, instruction);
//                instruction.display_instance_sets = request.Instruction.display_instance_sets;

//                instruction.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}