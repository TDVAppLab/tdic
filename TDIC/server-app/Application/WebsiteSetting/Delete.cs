using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Application.WebsiteSetting
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string title {get; set;}
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var t_website_setting =  await _context.t_website_settings.FindAsync(request.title);

                if(t_website_setting == null) return null;
                
                _context.Remove(t_website_setting);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete t_website_setting");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}