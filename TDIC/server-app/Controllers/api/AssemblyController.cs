using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Assembly;
using TDIC.Controllers;
using TDIC.Models.EDM;
using TDIC.DTOs;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class AssemblyController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("index")]
        public async Task<ActionResult> GetIndex()
        {
            return HandleResult(await Mediator.Send(new List.Query{}));
        }

        [AllowAnonymous]
        [HttpGet("details/{id}")]
        public async Task<ActionResult> GetInstruction(long id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_assemblyUpdateUDto t_assembly)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ t_assembly = t_assembly}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_assembly t_assembly){
            return HandleResult(await Mediator.Send(new Create.Command{ t_assembly = t_assembly}));
        }
        
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id=id}));
        }

    }
}