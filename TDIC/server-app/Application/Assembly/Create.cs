using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.Assembly
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>{
            public t_assembly t_assembly {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.t_assembly).SetValidator(new AssemblyValidator());
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

                
                long id_assy = 1 + (await _context.t_assemblies
                                        .MaxAsync(t => (long?)t.id_assy) ?? 0);

                request.t_assembly.id_assy = id_assy;
                //request.t_assembly.assy_name = assy_name;

                
                request.t_assembly.create_user = "";
                request.t_assembly.create_datetime = DateTime.Now;
                request.t_assembly.latest_update_user = "";
                request.t_assembly.latest_update_datetime = DateTime.Now;

                _context.t_assemblies.Add(request.t_assembly);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create assembly");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }

}