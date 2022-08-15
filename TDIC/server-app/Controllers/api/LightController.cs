using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Light;
using TDIC.Controllers;
using TDIC.Models.EDM;
using TDIC.DTOs;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class LightController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index/{id}")]
        public async Task<ActionResult> GetIndex(long id)
        {
            return HandleResult(await Mediator.Send(new List.Query{id_article=id}));
        }

        [AllowAnonymous]
        [HttpGet("details/id_article={id_article}&id_light={id_light}")]
        public async Task<ActionResult> Details(long id_article,long id_light)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id_article = id_article,id_light=id_light}));
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_lightUpdateUDto light)
        {
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
    }
}