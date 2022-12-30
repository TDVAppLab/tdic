using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.ModelFile;
using TDIC.Controllers;
using TDIC.Models.EDM;
using Microsoft.AspNetCore.Http;
using System.IO;
using TDIC.DTOs;
using System.Collections.Generic;



// For SPA
namespace API.Controllers
{
    public class FileModel{
        string FileName {get; set;}
        IFormFile file {get; set;}
    }



    [Authorize]
    public class ModelFilesController : BaseApiController
    {        
        [HttpGet("Index/is_exclude_used={is_exclude_used}")]
        public async Task<ActionResult> GetModelFiles(bool is_exclude_used)
        {
            return HandleResult(await Mediator.Send(new List.Query{is_exclude_used = is_exclude_used}));
        }
                
        [AllowAnonymous]
        [HttpGet("autherList/{id}")]
        public async Task<ActionResult> GetModelAutherList(Guid id)
        {
            return HandleResult(await Mediator.Send(new ModelAutherList.Query{id = id, IsAuthenticated=User.Identity.IsAuthenticated}));
        }

        [HttpGet("details/{id}")]
        public async Task<ActionResult> GetDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        }
        [AllowAnonymous]

        [HttpGet("file/{id}")]
        public async Task<ActionResult> GetFile(Guid id)
        {
            var det = await Mediator.Send(new ModelFile.Query{ID = id});


            return File(det.Value.file_data, det.Value.type_data, det.Value.file_name);
        }


        [HttpPost("create")]
        public async Task<IActionResult> CreateModelFileObject([FromBody] t_part t_part){
            return HandleResult(await Mediator.Send(new CreateModelFileObject.Command{ t_part = t_part}));
        }


        [HttpPost("uploadmodelfile/{id}")]
        public async Task<ActionResult> UploadModelFile(Guid id, [FromForm] IFormFile file)
        {
            
            t_part t_part = new t_part();

            if (file == null)
            {
                return HandleResult(await Mediator.Send(new ReUploadModelfile.Command{ id_part=id, file = null }));
            }


            return HandleResult(await Mediator.Send(new ReUploadModelfile.Command{ id_part=id, file = file}));
        }


        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_partUpdateUDto t_part){
            return HandleResult(await Mediator.Send(new Edit.Command{ t_part = t_part}));
        }

        
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id=id}));
        }


        [HttpGet("getpartanimationclip/{id}")]
        public async Task<ActionResult> GetPartAnimationClip(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetPartAnimationClip.Query{ID = id}));
        }
        

        [HttpPost("updatepartanimationClip/{id}")]
        public async Task<IActionResult> UpdatePartAnimationClip(Guid id, [FromBody] IList<PartAnimationClipDtO> partAnimationClips)
        {
            return HandleResult(await Mediator.Send(new UpdatePartAnimationClip.Command{id_part=id, PartAnimationClips=partAnimationClips}));
        }
    }
}