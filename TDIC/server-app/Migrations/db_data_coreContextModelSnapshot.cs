﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TDIC.Models.EDM;

#nullable disable

namespace serverapp.Migrations
{
    [DbContext(typeof(db_data_coreContext))]
    partial class db_data_coreContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("TDIC.Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.m_status_article", b =>
                {
                    b.Property<short>("id")
                        .HasColumnType("smallint");

                    b.Property<string>("description")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<bool>("is_approved")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("id");

                    b.ToTable("m_status_article", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_annotation", b =>
                {
                    b.Property<Guid>("id_article")
                        .HasColumnType("uniqueidentifier");

                    b.Property<long>("id_annotation")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("description1")
                        .HasMaxLength(550)
                        .HasColumnType("nvarchar(550)");

                    b.Property<string>("description2")
                        .HasMaxLength(550)
                        .HasColumnType("nvarchar(550)");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double?>("pos_x")
                        .HasColumnType("float");

                    b.Property<double?>("pos_y")
                        .HasColumnType("float");

                    b.Property<double?>("pos_z")
                        .HasColumnType("float");

                    b.Property<short>("status")
                        .HasColumnType("smallint");

                    b.Property<string>("title")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("id_article", "id_annotation");

                    b.ToTable("t_annotation", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_annotation_display", b =>
                {
                    b.Property<Guid>("id_article")
                        .HasColumnType("uniqueidentifier");

                    b.Property<long>("id_instruct")
                        .HasColumnType("bigint");

                    b.Property<long>("id_annotation")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("is_display")
                        .HasColumnType("bit");

                    b.Property<bool>("is_display_description")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("id_article", "id_instruct", "id_annotation");

                    b.HasIndex("id_article", "id_annotation");

                    b.ToTable("t_annotation_display", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_article", b =>
                {
                    b.Property<Guid>("id_article")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("bg_color")
                        .HasMaxLength(7)
                        .HasColumnType("nvarchar(7)");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool?>("gammaOutput")
                        .HasColumnType("bit");

                    b.Property<long?>("id_assy")
                        .HasColumnType("bigint");

                    b.Property<Guid?>("id_attachment_for_eye_catch")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool?>("isStarrySky")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("long_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("meta_category")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("meta_description")
                        .HasMaxLength(550)
                        .HasColumnType("nvarchar(550)");

                    b.Property<string>("short_description")
                        .HasMaxLength(550)
                        .HasColumnType("nvarchar(550)");

                    b.Property<short>("status")
                        .HasColumnType("smallint");

                    b.Property<string>("title")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("id_article")
                        .HasName("PK_t_product");

                    b.HasIndex("status");

                    b.ToTable("t_article", (string)null);

                    b.HasComment("総合的な製品情報を格納するテーブル");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_article_length_sumarry", b =>
                {
                    b.Property<DateTime>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<short>("status")
                        .HasColumnType("smallint");

                    b.Property<long>("length")
                        .HasColumnType("bigint");

                    b.Property<long>("length_first")
                        .HasColumnType("bigint");

                    b.HasKey("latest_update_datetime", "status");

                    b.ToTable("t_article_length_sumarry", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_attachment", b =>
                {
                    b.Property<Guid>("id_file")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<byte[]>("file_data")
                        .HasColumnType("varbinary(max)");

                    b.Property<long?>("file_length")
                        .HasColumnType("bigint");

                    b.Property<string>("file_name")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("format_data")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool?>("isActive")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((1))")
                        .HasComment("有効／無効");

                    b.Property<string>("itemlink")
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<DateTime>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("license")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("memo")
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("target_article_id")
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<string>("type_data")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.HasKey("id_file");

                    b.ToTable("t_attachment", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_instance_object", b =>
                {
                    b.Property<Guid>("id_article")
                        .HasColumnType("uniqueidentifier");

                    b.Property<long>("id_instance")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("id_part")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double>("pos_x")
                        .HasColumnType("float");

                    b.Property<double>("pos_y")
                        .HasColumnType("float");

                    b.Property<double>("pos_z")
                        .HasColumnType("float");

                    b.Property<double>("quaternion_w")
                        .HasColumnType("float");

                    b.Property<double>("quaternion_x")
                        .HasColumnType("float");

                    b.Property<double>("quaternion_y")
                        .HasColumnType("float");

                    b.Property<double>("quaternion_z")
                        .HasColumnType("float");

                    b.Property<double>("scale")
                        .HasColumnType("float");

                    b.HasKey("id_article", "id_instance")
                        .HasName("PK_t_instance_object");

                    b.HasIndex("id_part");

                    b.ToTable("t_instance_object", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_instruction", b =>
                {
                    b.Property<Guid>("id_article")
                        .HasColumnType("uniqueidentifier");

                    b.Property<long>("id_instruct")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("display_instance_sets")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("display_order")
                        .HasColumnType("bigint");

                    b.Property<int>("id_view")
                        .HasColumnType("int");

                    b.Property<bool>("is_automatic_camera_rotate")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("memo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("model_action_settings")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("short_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("subtitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("title")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.HasKey("id_article", "id_instruct");

                    b.HasIndex("id_article", "id_view");

                    b.ToTable("t_instruction", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_light", b =>
                {
                    b.Property<Guid>("id_article")
                        .HasColumnType("uniqueidentifier");

                    b.Property<long>("id_light")
                        .HasColumnType("bigint");

                    b.Property<long?>("color")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double?>("decay")
                        .HasColumnType("float");

                    b.Property<double?>("distance")
                        .HasColumnType("float");

                    b.Property<byte[]>("file_data")
                        .HasColumnType("varbinary(max)");

                    b.Property<long?>("groundcolor")
                        .HasColumnType("bigint");

                    b.Property<double?>("intensity")
                        .HasColumnType("float");

                    b.Property<bool>("is_lensflare")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double?>("lfsize")
                        .HasColumnType("float");

                    b.Property<string>("light_type")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<double?>("power")
                        .HasColumnType("float");

                    b.Property<double?>("px")
                        .HasColumnType("float");

                    b.Property<double?>("py")
                        .HasColumnType("float");

                    b.Property<double?>("pz")
                        .HasColumnType("float");

                    b.Property<double?>("shadow")
                        .HasColumnType("float");

                    b.Property<string>("short_description")
                        .HasMaxLength(550)
                        .HasColumnType("nvarchar(550)");

                    b.Property<long?>("skycolor")
                        .HasColumnType("bigint");

                    b.Property<string>("title")
                        .HasMaxLength(550)
                        .HasColumnType("nvarchar(550)");

                    b.Property<double?>("tx")
                        .HasColumnType("float");

                    b.Property<double?>("ty")
                        .HasColumnType("float");

                    b.Property<double?>("tz")
                        .HasColumnType("float");

                    b.HasKey("id_article", "id_light");

                    b.ToTable("t_light", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_part", b =>
                {
                    b.Property<Guid>("id_part")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AnimationClip")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("author")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<byte[]>("file_data")
                        .HasColumnType("varbinary(max)");

                    b.Property<long?>("file_length")
                        .HasColumnType("bigint");

                    b.Property<string>("file_name")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<byte[]>("file_texture")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("format_data")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("itemlink")
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("license")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("memo")
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<string>("part_number")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("type_data")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("type_texture")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<int>("version")
                        .HasColumnType("int");

                    b.HasKey("id_part");

                    b.ToTable("t_part", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_view", b =>
                {
                    b.Property<Guid>("id_article")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("id_view")
                        .HasColumnType("int");

                    b.Property<double?>("cam_lookat_x")
                        .HasColumnType("float");

                    b.Property<double?>("cam_lookat_y")
                        .HasColumnType("float");

                    b.Property<double?>("cam_lookat_z")
                        .HasColumnType("float");

                    b.Property<double?>("cam_pos_x")
                        .HasColumnType("float");

                    b.Property<double?>("cam_pos_y")
                        .HasColumnType("float");

                    b.Property<double?>("cam_pos_z")
                        .HasColumnType("float");

                    b.Property<double?>("cam_quat_w")
                        .HasColumnType("float");

                    b.Property<double?>("cam_quat_x")
                        .HasColumnType("float");

                    b.Property<double?>("cam_quat_y")
                        .HasColumnType("float");

                    b.Property<double?>("cam_quat_z")
                        .HasColumnType("float");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double?>("obt_target_x")
                        .HasColumnType("float");

                    b.Property<double?>("obt_target_y")
                        .HasColumnType("float");

                    b.Property<double?>("obt_target_z")
                        .HasColumnType("float");

                    b.Property<string>("title")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.HasKey("id_article", "id_view");

                    b.ToTable("t_view", (string)null);
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_website_setting", b =>
                {
                    b.Property<string>("title")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("create_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("create_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("data")
                        .HasMaxLength(2000)
                        .HasColumnType("nvarchar(2000)");

                    b.Property<DateTime?>("latest_update_datetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("latest_update_user")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("memo")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("title");

                    b.ToTable("t_website_setting", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("TDIC.Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("TDIC.Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TDIC.Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("TDIC.Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_annotation", b =>
                {
                    b.HasOne("TDIC.Models.EDM.t_article", "id_articleNavigation")
                        .WithMany("t_annotations")
                        .HasForeignKey("id_article")
                        .IsRequired()
                        .HasConstraintName("FK_t_annotation_t_article");

                    b.Navigation("id_articleNavigation");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_annotation_display", b =>
                {
                    b.HasOne("TDIC.Models.EDM.t_annotation", "id_a")
                        .WithMany("t_annotation_displays")
                        .HasForeignKey("id_article", "id_annotation")
                        .IsRequired()
                        .HasConstraintName("FK_t_annotation_display_t_annotation");

                    b.HasOne("TDIC.Models.EDM.t_instruction", "id_")
                        .WithMany("t_annotation_displays")
                        .HasForeignKey("id_article", "id_instruct")
                        .IsRequired()
                        .HasConstraintName("FK_t_annotation_display_t_instruction");

                    b.Navigation("id_");

                    b.Navigation("id_a");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_article", b =>
                {
                    b.HasOne("TDIC.Models.EDM.m_status_article", "statusNavigation")
                        .WithMany("t_articles")
                        .HasForeignKey("status")
                        .IsRequired()
                        .HasConstraintName("FK_t_article_m_status_article");

                    b.Navigation("statusNavigation");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_instance_object", b =>
                {
                    b.HasOne("TDIC.Models.EDM.t_article", "id_articleNavigation")
                        .WithMany("t_instance_objects")
                        .HasForeignKey("id_article")
                        .IsRequired()
                        .HasConstraintName("FK_t_instance_object_t_article");

                    b.HasOne("TDIC.Models.EDM.t_part", "id_partNavigation")
                        .WithMany("t_instance_objects")
                        .HasForeignKey("id_part")
                        .IsRequired()
                        .HasConstraintName("FK_t_instance_object_t_part");

                    b.Navigation("id_articleNavigation");

                    b.Navigation("id_partNavigation");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_instruction", b =>
                {
                    b.HasOne("TDIC.Models.EDM.t_article", "id_articleNavigation")
                        .WithMany("t_instructions")
                        .HasForeignKey("id_article")
                        .IsRequired()
                        .HasConstraintName("FK_t_instruction_t_article");

                    b.HasOne("TDIC.Models.EDM.t_view", "id_")
                        .WithMany("t_instructions")
                        .HasForeignKey("id_article", "id_view")
                        .IsRequired()
                        .HasConstraintName("FK_t_instruction_t_view");

                    b.Navigation("id_");

                    b.Navigation("id_articleNavigation");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_light", b =>
                {
                    b.HasOne("TDIC.Models.EDM.t_article", "id_articleNavigation")
                        .WithMany("t_lights")
                        .HasForeignKey("id_article")
                        .IsRequired()
                        .HasConstraintName("FK_t_light_t_article");

                    b.Navigation("id_articleNavigation");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_view", b =>
                {
                    b.HasOne("TDIC.Models.EDM.t_article", "id_articleNavigation")
                        .WithMany("t_views")
                        .HasForeignKey("id_article")
                        .IsRequired()
                        .HasConstraintName("FK_t_view_t_article");

                    b.Navigation("id_articleNavigation");
                });

            modelBuilder.Entity("TDIC.Models.EDM.m_status_article", b =>
                {
                    b.Navigation("t_articles");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_annotation", b =>
                {
                    b.Navigation("t_annotation_displays");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_article", b =>
                {
                    b.Navigation("t_annotations");

                    b.Navigation("t_instance_objects");

                    b.Navigation("t_instructions");

                    b.Navigation("t_lights");

                    b.Navigation("t_views");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_instruction", b =>
                {
                    b.Navigation("t_annotation_displays");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_part", b =>
                {
                    b.Navigation("t_instance_objects");
                });

            modelBuilder.Entity("TDIC.Models.EDM.t_view", b =>
                {
                    b.Navigation("t_instructions");
                });
#pragma warning restore 612, 618
        }
    }
}
