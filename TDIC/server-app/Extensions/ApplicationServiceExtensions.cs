

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AttachmentFile;
using AutoMapper;
using TDIC.Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
// using Microsoft.OpenApi.Models;

namespace TDIC.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection ApplicationServices(this IServiceCollection services,
                                IConfiguration config)
        {
            
            //  services.AddSwaggerGen(c =>
            // {
            //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            // }); 
            // services.AddDbContext<DataContext>(opt =>
            // {
            //     opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            // } );
            // services.AddCors(opt => 
            // {
            //     opt.AddPolicy("CorsPolicy", policy => 
            //     {
            //         policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
            //     });
            // });
             services.AddMediatR(typeof(List.Handler).Assembly);
             services.AddAutoMapper(typeof(MappingProfiles));

             return services;
        }
    }
}

