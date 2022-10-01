using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.InstanceObject
{
    public class Create
    {
        public class Command : IRequest<Result<t_instance_object>>{
            public t_instance_object t_instance_object {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.t_instance_object).SetValidator(new InstanceObjectValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<t_instance_object>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_instance_object>> Handle(Command request, CancellationToken cancellationToken)
            {

                
                long id_instance = 1 + (await _context.t_instance_objects.Where(t => t.id_article == request.t_instance_object.id_article)
                                        .MaxAsync(t => (long?)t.id_instance) ?? 0);

                request.t_instance_object.id_instance = id_instance;

                
                request.t_instance_object.create_user = "";
                request.t_instance_object.create_datetime = DateTime.Now;
                request.t_instance_object.latest_update_user = "";
                request.t_instance_object.latest_update_datetime = DateTime.Now;

                _context.t_instance_objects.Add(request.t_instance_object);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_instance_object>.Failure("Failed to create t_instance_object");


                return Result<t_instance_object>.Success(request.t_instance_object);
            }
        }

    }

}