using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using AutoMapper;
using System.Collections.Generic;

namespace Application.Article
{
    public class Duplicate
    {
        public class Command : IRequest<Result<t_article>>{
            public long id_article {get; set;}
        }
        public class Handler : IRequestHandler<Command, Result<t_article>>
        {
        private readonly db_data_coreContext _context;
        private readonly IMapper _mapper;
            public Handler(db_data_coreContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<t_article>> Handle(Command request, CancellationToken cancellationToken)
            {

                // copy article
                var article =  await _context.t_articles.FindAsync(request.id_article);

                if(article == null) return null;                

                long id_article_new = 1 + (await _context.t_articles
                                        .MaxAsync(t => (long?)t.id_article) ?? 0);

                string title_new = "Copy : " + ( article.title ?? "" );

                short status_new = await _context.m_status_articles.Where(m => m.is_approved == false).MinAsync(t => t.id);


                
                article.id_article = id_article_new;
                article.id_article_uid = Guid.NewGuid();
                article.title = title_new;
                article.status = status_new;

                article.create_user = "";
                article.create_datetime = DateTime.Now;
                article.latest_update_user = "";
                article.latest_update_datetime = DateTime.Now;

                _context.t_articles.Add(article);

                // copy view
                var views =  await _context.t_views.Where(x => x.id_article == request.id_article).ToListAsync();

                if(views.Count>0){
                    
                    foreach (var view in views)
                    {
                        view.id_article = article.id_article;
                
                        view.create_user = "";
                        view.create_datetime = DateTime.Now;
                        view.latest_update_user = "";
                        view.latest_update_datetime = DateTime.Now;
                    }
                    
                    await _context.t_views.AddRangeAsync(views);
                    
                }

                // copy view
                var instructions =  await _context.t_instructions.Where(x => x.id_article == request.id_article).ToListAsync();

                if(instructions.Count>0){
                    
                    foreach (var instruction in instructions)
                    {
                        instruction.id_article = article.id_article;
                
                        instruction.create_user = "";
                        instruction.create_datetime = DateTime.Now;
                        instruction.latest_update_user = "";
                        instruction.latest_update_datetime = DateTime.Now;
                    }
                    
                    await _context.t_instructions.AddRangeAsync(instructions);
                    
                }

                // copy annotation and annotation displays
                var annotations =  await _context.t_annotations.Where(x => x.id_article == request.id_article).ToListAsync();
                var annotation_displays =  await _context.t_annotation_displays.Where(x => x.id_article == request.id_article).ToListAsync();
                if(annotations.Count>0){

                    
                    foreach (var annotation in annotations)
                    {
                        annotation.id_article = article.id_article;
                
                        annotation.create_user = "";
                        annotation.create_datetime = DateTime.Now;
                        annotation.latest_update_user = "";
                        annotation.latest_update_datetime = DateTime.Now;
                    }

                    
                    foreach (var annotation_display in annotation_displays)
                    {
                        annotation_display.id_article = article.id_article;
                
                        annotation_display.create_user = "";
                        annotation_display.create_datetime = DateTime.Now;
                        annotation_display.latest_update_user = "";
                        annotation_display.latest_update_datetime = DateTime.Now;
                    }
                    
                    await _context.t_annotations.AddRangeAsync(annotations);
                    await _context.t_annotation_displays.AddRangeAsync(annotation_displays);
                }


                // copy t_instance_objects
                var instances =  await _context.t_instance_objects.Where(x => x.id_article == request.id_article).ToListAsync();

                if(instances.Count>0){
                    
                    foreach (var instance in instances)
                    {
                        instance.id_article = article.id_article;
                
                        instance.create_user = "";
                        instance.create_datetime = DateTime.Now;
                        instance.latest_update_user = "";
                        instance.latest_update_datetime = DateTime.Now;
                    }
                    
                    await _context.t_instance_objects.AddRangeAsync(instances);
                    
                }


                // copy t_instance_objects
                var lights =  await _context.t_lights.Where(x => x.id_article == request.id_article).ToListAsync();

                if(lights.Count>0){
                    
                    foreach (var light in lights)
                    {
                        light.id_article = article.id_article;
                
                        light.create_user = "";
                        light.create_datetime = DateTime.Now;
                        light.latest_update_user = "";
                        light.latest_update_datetime = DateTime.Now;
                    }
                    
                    await _context.t_lights.AddRangeAsync(lights);
                    
                }



                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_article>.Failure("Failed to create article");

                t_article ans_article = new t_article{id_article = article.id_article};

                return Result<t_article>.Success(ans_article);
            }
        }

    }

}