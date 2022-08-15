using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Annotation;
using TDIC.Controllers;
using TDIC.Models.EDM;
using TDIC.DTOs;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class AnnotationController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index/{id}")]
        public async Task<ActionResult> GetIndex(long id)
        {
            return HandleResult(await Mediator.Send(new List.Query{id_article=id}));
        }

        [AllowAnonymous]
        [HttpGet("details/id_article={id_article}&id_annotation={id_annotation}")]
        public async Task<ActionResult> Details(long id_article,long id_annotation)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id_article=id_article, id_annotation=id_annotation}));
        }


        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_annotationUpdateUDto annotation)
        {

            return HandleResult(await Mediator.Send(new Edit.Command{ Annotation = annotation}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_annotation annotation){
            return HandleResult(await Mediator.Send(new Create.Command{ Annotation = annotation}));
        }


        [HttpPost("delete/id_article={id_article}&id_annotation={id_annotation}")]
        public async Task<IActionResult> Delete(long id_article,long id_annotation)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_article=id_article, id_annotation=id_annotation}));
        }

    }
}