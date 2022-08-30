using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.Instancepart
{
    public class Create
    {
        public class Command : IRequest<Result<t_instance_part>>{
            public t_instance_part t_instance_part {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.t_instance_part).SetValidator(new InstancepartValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<t_instance_part>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_instance_part>> Handle(Command request, CancellationToken cancellationToken)
            {

                
                long id_inst = 1 + (await _context.t_instance_parts.Where(t => t.id_assy == request.t_instance_part.id_assy)
                                        .MaxAsync(t => (long?)t.id_inst) ?? 0);

                request.t_instance_part.id_inst = id_inst;

                
                request.t_instance_part.create_user = "";
                request.t_instance_part.create_datetime = DateTime.Now;
                request.t_instance_part.latest_update_user = "";
                request.t_instance_part.latest_update_datetime = DateTime.Now;

                _context.t_instance_parts.Add(request.t_instance_part);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_instance_part>.Failure("Failed to create t_instance_part");

                //var ans = request.t_instance_part.id_inst;


                return Result<t_instance_part>.Success(request.t_instance_part);
            }
        }

    }

}