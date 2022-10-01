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
using System.Linq;
using TDIC.DTOs;

namespace Application.InstanceObject
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public IList<t_instance_objectUpdateUDto> List {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                //RuleFor(x => x.Instancepart).SetValidator(new InstancepartValidator());
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

                foreach (var m in request.List)
                {
                    var target = await _context.t_instance_objects.FindAsync(m.id_article, m.id_instance);
                    
                    _mapper.Map(m, target);
                    target.latest_update_datetime = DateTime.Now;
                }



                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update t_instance_object");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}