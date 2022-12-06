using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;





namespace Application.Article
{
    public class DeleteDeep
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string id_article {get; set;}
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
                var article =  await _context.t_articles.FindAsync(request.id_article);

                if(article == null) return null;
                
                _context.Remove(article);

                //delete annotation and annotation displays
                var annotations =  await _context.t_annotations.Where(x => x.id_article == request.id_article).ToListAsync();
                var annotation_displays =  await _context.t_annotation_displays.Where(x => x.id_article == request.id_article).ToListAsync();
                if(annotations.Count>0){
                    _context.t_annotation_displays.RemoveRange(annotation_displays);
                    _context.t_annotations.RemoveRange(annotations);
                }


                //delete instance
                var instances =  await _context.t_instance_objects.Where(x => x.id_article == request.id_article).ToListAsync();
                if(instances.Count>0){
                    _context.t_instance_objects.RemoveRange(instances);
                }


                //delete instruction
                var instructions =  await _context.t_instructions.Where(x => x.id_article == request.id_article).ToListAsync();
                if(instructions.Count>0){
                    _context.t_instructions.RemoveRange(instructions);
                }


                //delete t_lights
                var lights =  await _context.t_lights.Where(x => x.id_article == request.id_article).ToListAsync();
                if(lights.Count>0){
                    _context.t_lights.RemoveRange(lights);
                }


                //delete views
                var views =  await _context.t_views.Where(x => x.id_article == request.id_article).ToListAsync();
                if(views.Count>0){
                    _context.t_views.RemoveRange(views);
                }


                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete article");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}