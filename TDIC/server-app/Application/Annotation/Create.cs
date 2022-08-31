


using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using System.Collections.Generic;

namespace Application.Annotation
{
    public class Create
    {
        public class Command : IRequest<Result<t_annotation>>{
            public t_annotation Annotation {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Annotation).SetValidator(new AnnotationValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<t_annotation>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_annotation>> Handle(Command request, CancellationToken cancellationToken)
            {

                
                long id_annotation = 1 + (await _context.t_annotations.Where(t => t.id_article == request.Annotation.id_article)
                                        .MaxAsync(t => (long?)t.id_annotation) ?? 0);

                request.Annotation.id_annotation = id_annotation;

                
                request.Annotation.create_user = "";
                request.Annotation.create_datetime = DateTime.Now;
                request.Annotation.latest_update_user = "";
                request.Annotation.latest_update_datetime = DateTime.Now;


                //annotationに一致するannotation displayを作る

                await _context.t_annotations.AddAsync(request.Annotation);

                

                var annotation_displays = new List<t_annotation_display>();
                
                var instructions = await _context.t_instructions.Where(t => t.id_article == request.Annotation.id_article).ToListAsync();

                if(instructions.Count>0){

                    foreach (var item in instructions)
                    {
                        annotation_displays.Add(new t_annotation_display
                            {
                                id_article=item.id_article, 
                                id_instruct=item.id_instruct, 
                                id_annotation=id_annotation, 
                                is_display=false, 
                                is_display_description=false, 
                                create_user="", 
                                create_datetime=null, 
                                latest_update_user="", 
                                latest_update_datetime=null});
                    }                    
                    await _context.t_annotation_displays.AddRangeAsync(annotation_displays);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_annotation>.Failure("Failed to create task");

                var x = request.Annotation;

                return Result<t_annotation>.Success(request.Annotation);
            }
        }

    }

}