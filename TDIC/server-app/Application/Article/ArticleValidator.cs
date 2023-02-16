using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.Article
{
    public class ArticleValidator : AbstractValidator<t_article>
    {
        public ArticleValidator()
        {
        }
    }
    public class ArticleUpdateUDtoValidator : AbstractValidator<t_articleUpdateUDto>
    {
        public ArticleUpdateUDtoValidator()
        {
        }
    }
    public class ArticleScreenInfoUpdateDtoValidator : AbstractValidator<t_articleScreenInfoUpdateDto>
    {
        public ArticleScreenInfoUpdateDtoValidator()
        {
        }
    }
}
