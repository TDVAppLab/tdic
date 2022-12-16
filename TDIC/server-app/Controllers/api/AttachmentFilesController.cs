using System;
using System.Threading.Tasks;
using TDIC.Models.EDM;
using Microsoft.AspNetCore.Mvc;
//using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.AttachmentFile;
using TDIC.Controllers;
using TDIC.DTOs;
using System.IO;
using Microsoft.AspNetCore.Http;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class AttachmentFilesController : BaseApiController
    {        
        [HttpGet("Index")]
        public async Task<ActionResult> GetAttachmentFiles()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
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
            var det = await Mediator.Send(new Details.Query{ID = id});


            return File(det.Value.file_data, det.Value.type_data, det.Value.name);
        }


        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_attachmentUpdateUDto t_attachment){
            return HandleResult(await Mediator.Send(new Edit.Command{ t_attachment = t_attachment}));
        }

        
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id=id}));
        }

        [HttpPost("createeyecatch")]
        public async Task<IActionResult> CreateEyecatch([FromBody] AttachmentfileEyecatchDtO image){
            return HandleResult(await Mediator.Send(new CreateEyecatch.Command{ id_article=image.id_article, imgfilebin=image.imgfilebin }));
        }


        [HttpPost("uploadfile")]
        public async Task<ActionResult> UploadFile([FromForm] IFormFile file)
        {
            
            t_attachment t_attachment = new t_attachment();

            if (file == null)
            {
                return HandleResult(await Mediator.Send(new Upload.Command{ t_attachment = null}));
            }

            t_attachment.name = file.FileName;
            t_attachment.file_data = GetByteArrayFromStream(file.OpenReadStream());
            t_attachment.type_data = file.ContentType;
            t_attachment.file_name = file.FileName;
            t_attachment.file_length = file.Length;
            t_attachment.format_data = "";


            t_attachment.itemlink = "";
            t_attachment.license = "";
            t_attachment.memo = "";

            
            t_attachment.isActive = true;


            return HandleResult(await Mediator.Send(new Upload.Command{ t_attachment = t_attachment}));
        }
        
        
        public static byte[] GetByteArrayFromStream(Stream sm)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                sm.CopyTo(ms);
                return ms.ToArray();
            }
        }
        

    }
}