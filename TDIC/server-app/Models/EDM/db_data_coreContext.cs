﻿using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TDIC.Domain;

#nullable disable

namespace TDIC.Models.EDM
{
    public partial class db_data_coreContext : IdentityDbContext<AppUser>
    {

        public db_data_coreContext(DbContextOptions<db_data_coreContext> options)
            : base(options)
        {
        }


        public virtual DbSet<m_status_article> m_status_articles { get; set; }
        public virtual DbSet<t_annotation> t_annotations { get; set; }
        public virtual DbSet<t_annotation_display> t_annotation_displays { get; set; }
        public virtual DbSet<t_article> t_articles { get; set; }
        public virtual DbSet<t_article_length_sumarry> t_article_length_sumarries { get; set; }
        public virtual DbSet<t_attachment> t_attachments { get; set; }
        public virtual DbSet<t_instance_object> t_instance_objects { get; set; }        
        public virtual DbSet<t_instruction> t_instructions { get; set; }
        public virtual DbSet<t_light> t_lights { get; set; }
        public virtual DbSet<t_part> t_parts { get; set; }
        public virtual DbSet<t_view> t_views { get; set; }
        public virtual DbSet<t_website_setting> t_website_settings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");


            modelBuilder.Entity<m_status_article>(entity =>
            {
                entity.ToTable("m_status_article");

                entity.Property(e => e.id).ValueGeneratedNever();

                entity.Property(e => e.description).HasMaxLength(250);

                entity.Property(e => e.name).HasMaxLength(50);
            });

            modelBuilder.Entity<t_annotation>(entity =>
            {
                entity.HasKey(e => new { e.id_article, e.id_annotation });

                entity.ToTable("t_annotation");

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.description1).HasMaxLength(550);

                entity.Property(e => e.description2).HasMaxLength(550);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.Property(e => e.title).HasMaxLength(250);

                entity.HasOne(d => d.id_articleNavigation)
                    .WithMany(p => p.t_annotations)
                    .HasForeignKey(d => d.id_article)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_annotation_t_article");
            });

            modelBuilder.Entity<t_annotation_display>(entity =>
            {
                entity.HasKey(e => new { e.id_article, e.id_instruct, e.id_annotation });

                entity.ToTable("t_annotation_display");

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.HasOne(d => d.id_a)
                    .WithMany(p => p.t_annotation_displays)
                    .HasForeignKey(d => new { d.id_article, d.id_annotation })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_annotation_display_t_annotation");

                entity.HasOne(d => d.id_)
                    .WithMany(p => p.t_annotation_displays)
                    .HasForeignKey(d => new { d.id_article, d.id_instruct })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_annotation_display_t_instruction");
            });

            modelBuilder.Entity<t_article>(entity =>
            {
                entity.HasKey(e => e.id_article)
                    .HasName("PK_t_product");

                entity.ToTable("t_article");

                entity.HasComment("総合的な製品情報を格納するテーブル");

                entity.Property(e => e.id_article).ValueGeneratedNever();

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.Property(e => e.meta_category).HasMaxLength(250);

                entity.Property(e => e.meta_description).HasMaxLength(550);

                entity.Property(e => e.short_description).HasMaxLength(550);

                entity.Property(e => e.title).HasMaxLength(250);

                entity.HasOne(d => d.statusNavigation)
                    .WithMany(p => p.t_articles)
                    .HasForeignKey(d => d.status)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_article_m_status_article");
            });

            modelBuilder.Entity<t_article_length_sumarry>(entity =>
            {
                entity.HasKey(e => new { e.latest_update_datetime, e.status });

                entity.ToTable("t_article_length_sumarry");
            });

            modelBuilder.Entity<t_attachment>(entity =>
            {
                entity.HasKey(e => e.id_file);

                entity.ToTable("t_attachment");

                entity.Property(e => e.id_file).ValueGeneratedNever();

                entity.Property(e => e.create_user)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.file_name).HasMaxLength(255);

                entity.Property(e => e.format_data).HasMaxLength(50);

                entity.Property(e => e.isActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))")
                    .HasComment("有効／無効");

                entity.Property(e => e.itemlink).HasMaxLength(2048);

                entity.Property(e => e.latest_update_user)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.license).HasMaxLength(255);

                entity.Property(e => e.memo).HasMaxLength(2048);

                entity.Property(e => e.name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.target_article_id).HasMaxLength(1000);

                entity.Property(e => e.type_data).HasMaxLength(128);
            });

            modelBuilder.Entity<t_instance_object>(entity =>
            {
                entity.HasKey(e => new { e.id_article, e.id_instance })
                    .HasName("PK_t_instance_object");

                entity.ToTable("t_instance_object");

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.HasOne(d => d.id_articleNavigation)
                    .WithMany(p => p.t_instance_objects)
                    .HasForeignKey(d => d.id_article)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_instance_object_t_article");

                entity.HasOne(d => d.id_partNavigation)
                    .WithMany(p => p.t_instance_objects)
                    .HasForeignKey(d => d.id_part)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_instance_object_t_part");
            });

            modelBuilder.Entity<t_instruction>(entity =>
            {
                entity.HasKey(e => new { e.id_article, e.id_instruct });

                entity.ToTable("t_instruction");

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.Property(e => e.title).HasMaxLength(128);

                entity.HasOne(d => d.id_articleNavigation)
                    .WithMany(p => p.t_instructions)
                    .HasForeignKey(d => d.id_article)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_instruction_t_article");

                entity.HasOne(d => d.id_)
                    .WithMany(p => p.t_instructions)
                    .HasForeignKey(d => new { d.id_article, d.id_view })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_instruction_t_view");
            });

            modelBuilder.Entity<t_light>(entity =>
            {
                entity.HasKey(e => new { e.id_article, e.id_light });

                entity.ToTable("t_light");

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.Property(e => e.light_type).HasMaxLength(250);

                entity.Property(e => e.short_description).HasMaxLength(550);

                entity.Property(e => e.title).HasMaxLength(550);

                entity.HasOne(d => d.id_articleNavigation)
                    .WithMany(p => p.t_lights)
                    .HasForeignKey(d => d.id_article)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_light_t_article");
            });

            modelBuilder.Entity<t_part>(entity =>
            {
                entity.HasKey(e => e.id_part);

                entity.ToTable("t_part");

                entity.Property(e => e.id_part).ValueGeneratedNever();

                entity.Property(e => e.author).HasMaxLength(250);

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.file_name).HasMaxLength(255);

                entity.Property(e => e.format_data).HasMaxLength(50);

                entity.Property(e => e.itemlink).HasMaxLength(2048);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.Property(e => e.license).HasMaxLength(255);

                entity.Property(e => e.memo).HasMaxLength(2048);

                entity.Property(e => e.part_number)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.type_data).HasMaxLength(128);

                entity.Property(e => e.type_texture).HasMaxLength(128);
            });

            modelBuilder.Entity<t_view>(entity =>
            {
                entity.HasKey(e => new { e.id_article, e.id_view });

                entity.ToTable("t_view");

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.Property(e => e.title).HasMaxLength(128);

                entity.HasOne(d => d.id_articleNavigation)
                    .WithMany(p => p.t_views)
                    .HasForeignKey(d => d.id_article)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_view_t_article");
            });

            modelBuilder.Entity<t_website_setting>(entity =>
            {
                entity.HasKey(e => e.title);

                entity.ToTable("t_website_setting");

                entity.Property(e => e.title).HasMaxLength(50);

                entity.Property(e => e.create_user).HasMaxLength(50);

                entity.Property(e => e.data).HasMaxLength(2000);

                entity.Property(e => e.latest_update_user).HasMaxLength(50);

                entity.Property(e => e.memo).HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
