using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using TDIC.DTOs;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace Application.ModelFile
{
    public class ReUploadModelfile
    {
        public class Command : IRequest<Result<t_partListDto>>{
            public Guid id_part {get; set;}
            public IFormFile file {get; set;}


        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                //RuleFor(x => x.Part).SetValidator(new PartValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<t_partListDto>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_partListDto>> Handle(Command request, CancellationToken cancellationToken)
            {


                var t_part = await _context.t_parts.FindAsync(request.id_part);

                if(t_part == null) return null;

                
                t_part.file_data = GetByteArrayFromStream(request.file.OpenReadStream());
                t_part.type_data = request.file.ContentType;
                t_part.file_name = request.file.FileName;
                t_part.file_length = request.file.Length;
                
                t_part.latest_update_user = "";
                t_part.latest_update_datetime = DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<t_partListDto>.Failure("Failed to upload task");

                t_partListDto ans_part = new t_partListDto{id_part = request.id_part};

                return Result<t_partListDto>.Success(ans_part);
            }
            public static byte[] GetByteArrayFromStream(Stream sm)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    sm.CopyTo(ms);
                    return ms.ToArray();
                }
            }
        }

    }

}