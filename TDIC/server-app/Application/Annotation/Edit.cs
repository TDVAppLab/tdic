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
using TDIC.DTOs;

namespace Application.Annotation
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public t_annotationUpdateUDto Annotation {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Annotation).SetValidator(new AnnotationUpdateUDtoValidator());
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
                var annotation = await _context.t_annotations.FindAsync(request.Annotation.id_article,request.Annotation.id_annotation);

                if(annotation == null) return null;

                _mapper.Map(request.Annotation, annotation);

                annotation.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update annotation");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}