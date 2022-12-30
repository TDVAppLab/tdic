using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using TDIC.DTOs;

namespace Application.ModelFile
{
    public class CreateModelFileObject
    {
        public class Command : IRequest<Result<t_partListDto>>{
            public t_part t_part {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.t_part).SetValidator(new PartValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<t_partListDto>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_partListDto>> Handle(Command request, CancellationToken cancellationToken)
            {


                request.t_part.id_part = Guid.NewGuid();
                request.t_part.version=0;

                
                request.t_part.create_user = "";
                request.t_part.create_datetime = DateTime.Now;
                request.t_part.latest_update_user = "";
                request.t_part.latest_update_datetime = DateTime.Now;

                _context.t_parts.Add(request.t_part);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_partListDto>.Failure("Failed to create task");

                t_partListDto ans = new t_partListDto{id_part = request.t_part.id_part};

                return Result<t_partListDto>.Success(ans);
            }
        }

    }

}