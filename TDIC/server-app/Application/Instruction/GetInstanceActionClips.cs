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

namespace Application.Instruction
{
    public class GetInstanceActionClips
    {
        public class Query : IRequest<Result<List<InstanceActionExecSettingDtO>>>{
            public long ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<InstanceActionExecSettingDtO>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<InstanceActionExecSettingDtO>>> Handle(Query request, CancellationToken cancellationToken)
            {

                
                var instructions =  
                    await _context.t_instructions
                        .Where(x => x.id_article == request.ID)
                        .Select(x => new {                        
                            id_instruct = x.id_instruct,
                            model_action_settings = x.model_action_settings,})
                        .ToListAsync();


                if(instructions == null) return null;

                List<InstanceActionExecSettingDtO> ans = new List<InstanceActionExecSettingDtO>();
                //try{
                    //ans = JsonSerializer.Deserialize<List<InstanceActionExecSettingDtO>>(model_action_settings_list.AnimationClip);


                    foreach (var instruction in instructions)
                    {
                        //data.Add(new InstanceDisplay{id_assy=inst.id_assy, id_inst=inst.id_inst, isDisplay=true});
                        try{
                            var temp_model_action_settings = JsonSerializer.Deserialize<List<InstanceActionExecSettingDtO>>(instruction.model_action_settings);
                            ans.AddRange(temp_model_action_settings);
                        } catch {
                        }
                    }



                //} catch{
                //    ans = new List<InstanceActionExecSettingDtO>();

                //}

                if(ans.Count<1){
                    ans = new List<InstanceActionExecSettingDtO>();
                }

                return Result<List<InstanceActionExecSettingDtO>>.Success(ans);
            }
        }
    }
}