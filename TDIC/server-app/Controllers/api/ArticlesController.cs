using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Article;
using TDIC.Controllers;
using TDIC.Models.EDM;
using TDIC.DTOs;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class ArticlesController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index")]
        public async Task<ActionResult> GetAttachmentFiles()
        {
            return HandleResult(await Mediator.Send(new List.Query{IsAuthenticated=User.Identity.IsAuthenticated}));
        }

        [AllowAnonymous]
        [HttpGet("details/{id}")]
        public async Task<ActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        }
        

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_articleUpdateUDto article)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ Article = article}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_article article){
            return HandleResult(await Mediator.Send(new Create.Command{ Article = article}));
        }
        
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_article=id}));
        }
        
        [HttpPost("deletedeep/{id}")]
        public async Task<IActionResult> DeleteDeep(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteDeep.Command{id_article=id}));
        }
        
        [HttpPost("duplicate/{id}")]
        public async Task<IActionResult> Duplicate(Guid id)
        {
            return HandleResult(await Mediator.Send(new Duplicate.Command{id_article=id}));
        }
        

        [HttpPost("updatescreeninfo")]
        public async Task<IActionResult> UpdateScreenInfo([FromBody] t_articleScreenInfoUpdateDto articleScreenInfo)
        {

            return HandleResult(await Mediator.Send(new UpdateScreenInfo.Command{ articleScreenInfo = articleScreenInfo}));
        }


    }
}