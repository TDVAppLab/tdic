using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;





namespace Application.InstanceObject
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string id_article {get; set;}
            public long id_instance {get; set;}
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
                var t_instance_object =  await _context.t_instance_objects.FindAsync(request.id_article, request.id_instance);

                if(t_instance_object == null) return null;
                
                _context.Remove(t_instance_object);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete t_instance_object");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}