using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TDIC.Models.EDM;
using TDIC.Application.Core;

namespace Application.WebsiteSetting
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
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
        private readonly IMapper _mapper;
            public Handler(db_data_coreContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var t_website_setting = await _context.t_website_settings.FindAsync(request.t_website_setting.title);

                if(t_website_setting == null) return null;

                //_mapper.Map(request.Instruction, instruction);

                //automapperの修正方法が分からないので、暫定的に直書きする
                t_website_setting.data=request.t_website_setting.data;
                t_website_setting.memo=request.t_website_setting.memo;
                

                t_website_setting.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update t_website_setting");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}