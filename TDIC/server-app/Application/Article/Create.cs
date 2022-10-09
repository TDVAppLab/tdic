using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.Article
{
    public class Create
    {
        public class Command : IRequest<Result<t_article>>{
            public t_article Article {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Article).SetValidator(new ArticleValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<t_article>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_article>> Handle(Command request, CancellationToken cancellationToken)
            {

                
                long id_article = 1 + (await _context.t_articles
                                        .MaxAsync(t => (long?)t.id_article) ?? 0);

                request.Article.id_article = id_article;

                
                request.Article.create_user = "";
                request.Article.create_datetime = DateTime.Now;
                request.Article.latest_update_user = "";
                request.Article.latest_update_datetime = DateTime.Now;

                _context.t_articles.Add(request.Article);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_article>.Failure("Failed to create task");

                t_article ans_article = new t_article{id_article = request.Article.id_article};

                return Result<t_article>.Success(ans_article);
            }
        }

    }

}