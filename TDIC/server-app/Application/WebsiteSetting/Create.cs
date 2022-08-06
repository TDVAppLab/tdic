using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.WebsiteSetting
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>{
            public t_website_setting t_website_setting {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.t_website_setting).SetValidator(new WebsiteSettingValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {


                
                request.t_website_setting.create_user = "";
                request.t_website_setting.create_datetime = DateTime.Now;
                request.t_website_setting.latest_update_user = "";
                request.t_website_setting.latest_update_datetime = DateTime.Now;

                _context.t_website_settings.Add(request.t_website_setting);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create task");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }

}