using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Instruction;
using TDIC.Controllers;
using TDIC.Models.EDM;





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
        public async Task<IActionResult> Update([FromBody] t_instruction instruction)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ Instruction = instruction}));
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