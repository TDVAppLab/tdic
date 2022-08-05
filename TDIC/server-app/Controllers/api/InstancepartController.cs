using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Instancepart;
using TDIC.Controllers;
using TDIC.Models.EDM;
using System.Collections.Generic;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class InstancepartController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index/{id}")]
        public async Task<ActionResult> GetIndex(long id)
        {
            return HandleResult(await Mediator.Send(new List.Query{id_assy=id}));
        }

        [AllowAnonymous]
        [HttpGet("details/id_assy={id_assy}&id_inst={id_inst}")]
        public async Task<ActionResult> GetDetails(long id_assy,long id_inst)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id_assy = id_assy,id_inst=id_inst}));
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] IList<t_instance_part> List)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ List = List}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_instance_part t_instance_part){
            return HandleResult(await Mediator.Send(new Create.Command{ t_instance_part = t_instance_part}));
        }
        
        [HttpPost("delete/id_assy={id_assy}&id_inst={id_inst}")]
        public async Task<IActionResult> Delete(long id_assy, long id_inst)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_assy=id_assy, id_inst=id_inst}));
        }
    }
}