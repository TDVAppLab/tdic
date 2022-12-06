using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.InstanceObject;
using TDIC.Controllers;
using TDIC.Models.EDM;
using System.Collections.Generic;
using TDIC.DTOs;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class InstanceobjectController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index/{id}")]
        public async Task<ActionResult> GetIndex(Guid id)
        {
            return HandleResult(await Mediator.Send(new List.Query{id_article=id}));
        }

        [AllowAnonymous]
        [HttpGet("details/id_article={id_assy}&id_instance={id_instance}")]
        public async Task<ActionResult> GetDetails(Guid id_article,long id_instance)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id_article = id_article,id_instance=id_instance}));
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] IList<t_instance_objectUpdateUDto> List)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ List = List}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_instance_object t_instance_object){
            return HandleResult(await Mediator.Send(new Create.Command{ t_instance_object = t_instance_object}));
        }
        
        [HttpPost("delete/id_article={id_article}&id_instance={id_instance}")]
        public async Task<IActionResult> Delete(Guid id_article, long id_instance)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_article=id_article, id_instance=id_instance}));
        }
    }
}