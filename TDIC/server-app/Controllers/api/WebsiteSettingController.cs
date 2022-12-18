using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.WebsiteSetting;
using TDIC.Controllers;
using TDIC.Models.EDM;
using TDIC.DTOs;





// For SPA
namespace API.Controllers
{
    public class WebsiteSettingController : BaseApiController
    { 
        [HttpGet("index")]
        public async Task<ActionResult> GetIndex()
        {
            return HandleResult(await Mediator.Send(new List.Query{}));
        }

        [AllowAnonymous]
        [HttpGet("details/title={title}")]
        public async Task<ActionResult> GetInstruction(string title)
        {
            return HandleResult(await Mediator.Send(new Details.Query{title = title}));
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_website_settingUpdateUDto t_website_setting)
        {

            return HandleResult(await Mediator.Send(new Edit.Command{ t_website_setting = t_website_setting}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_website_setting t_website_setting){
            return HandleResult(await Mediator.Send(new Create.Command{ t_website_setting = t_website_setting}));
        }
        
        [HttpPost("delete/title={title}")]
        public async Task<IActionResult> Delete(string title)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{title=title}));
        }

    }
}