using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Article;
using TDIC.Controllers;
using TDIC.Models.EDM;





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
        public async Task<ActionResult> GetActivity(long id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        }
        

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_article article)
        {

            return HandleResult(await Mediator.Send(new Edit.Command{ Article = article}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_article article){
            return HandleResult(await Mediator.Send(new Create.Command{ Article = article}));
        }
        
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_article=id}));
        }

    }
}