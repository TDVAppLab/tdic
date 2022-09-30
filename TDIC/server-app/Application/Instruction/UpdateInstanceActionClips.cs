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
using System.Text.Json;
using System.Linq;

namespace Application.Instruction
{
    public class UpdateInstanceActionClips
    {
        public class Command : IRequest<Result<Unit>>
        {
            public long id_article {get; set;}
            public long id_instruct {get; set;}
            public IList<InstanceActionExecSettingDtO> instanceActionExecSettings {get; set;}
        }/*
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
                var instruction = await _context.t_instructions.FindAsync(request.id_article,request.id_instruct);

                if(instruction == null) return null;



                try{
                    var temp_model_action_settings = JsonSerializer.Deserialize<List<InstanceActionExecSettingDtO>>(instruction.model_action_settings);

                    foreach(var model_action_setting in temp_model_action_settings)
                    {
                        var temp = request.instanceActionExecSettings.Where(x => x.id_instance == model_action_setting.id_instance && x.no == model_action_setting.no).FirstOrDefault();
                        model_action_setting.is_exec=temp.is_exec;
                        model_action_setting.num_loop=temp.num_loop;
                        model_action_setting.is_clamp_when_finished=temp.is_clamp_when_finished;

                    }
                    
                    instruction.model_action_settings = JsonSerializer.Serialize(temp_model_action_settings);
                    instruction.latest_update_datetime=DateTime.Now;
                    
                } catch {
                }

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update InstanceActionClips");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}