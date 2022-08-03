using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Assembly;
using TDIC.Controllers;
using TDIC.Models.EDM;





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
/*
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_light light)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ Light = light}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_light light){
            return HandleResult(await Mediator.Send(new Create.Command{ light = light}));
        }
        
        [HttpPost("delete/id_article={id_article}&id_light={id_light}")]
        public async Task<IActionResult> Delete(long id_article, long id_light)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_article=id_article, id_light=id_light}));
        }
*/
    }
}