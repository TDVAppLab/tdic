using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Instruction;
using TDIC.Controllers;
using TDIC.Models.EDM;
using TDIC.DTOs;
using System.Collections.Generic;
using TDIC.Models.VEDM;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class InstructionController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index/{id}")]
        public async Task<ActionResult> GetInstructions(long id)
        {
            return HandleResult(await Mediator.Send(new List.Query{id_article=id}));
        }

        [AllowAnonymous]
        [HttpGet("details/id_article={id_article}&id_instruct={id_instruct}")]
        public async Task<ActionResult> GetInstruction(long id_article,long id_instruct)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id_article = id_article,id_instruct=id_instruct}));
        }
        

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_instructionUpdateUDto instruction)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ Instruction = instruction}));
        }
        

        [HttpPost("updateinstancedisplay")]
        public async Task<IActionResult> UpdateInstancedisplay([FromBody] t_instructionUpdateUDto instruction)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new UpdateInstanceDisplay.Command{ Instruction = instruction}));
        }

        [HttpPost("resetinstancedisplay/{id}")]
        public async Task<IActionResult> ResetInstanceDisplay(long id)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new ResetInstanceDisplay.Command{ id_article = id}));
        }

        [HttpPost("resetinstanceactionclips/{id}")]
        public async Task<IActionResult> resetInstanceActionClips(long id)
        {
            return HandleResult(await Mediator.Send(new resetInstanceActionClips.Command{ id_article = id}));
        }

        [AllowAnonymous]
        [HttpGet("getinstanceactionclips/{id}")]
        public async Task<ActionResult> GetInstanceActionClips(long id)
        {
            return HandleResult(await Mediator.Send(new GetInstanceActionClips.Query{ID = id}));
        }
        

        [HttpPost("updateinstanceactionclips/id_article={id_article}&id_instruct={id_instruct}")]
        public async Task<IActionResult> UpdateInstanceActionClips(long id_article,long id_instruct, [FromBody] List<InstanceActionExecSetting> instanceActionExecSettings)
        {
            return HandleResult(await Mediator.Send(new UpdateInstanceActionClips.Command{ id_article = id_article, id_instruct=id_instruct, instanceActionExecSettings=instanceActionExecSettings}));
        }

        [HttpPost("delete/id_article={id_article}&id_instruct={id_instruct}")]
        public async Task<IActionResult> Delete(long id_article,long id_instruct)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_article=id_article, id_instruct=id_instruct}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_instruction instruction){
            return HandleResult(await Mediator.Send(new Create.Command{ Instruction = instruction}));
        }


    }
}