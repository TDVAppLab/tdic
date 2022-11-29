using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class addArticleUrlKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "m_status_article",
                columns: table => new
                {
                    id = table.Column<short>(type: "smallint", nullable: false),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    description = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    is_approved = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_status_article", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "t_article_length_sumarry",
                columns: table => new
                {
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    status = table.Column<short>(type: "smallint", nullable: false),
                    length = table.Column<long>(type: "bigint", nullable: false),
                    length_first = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_article_length_sumarry", x => new { x.latest_update_datetime, x.status });
                });

            migrationBuilder.CreateTable(
                name: "t_attachment",
                columns: table => new
                {
                    id_file = table.Column<long>(type: "bigint", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    file_data = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    type_data = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    format_data = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    file_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    file_length = table.Column<long>(type: "bigint", nullable: true),
                    itemlink = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    license = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    memo = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    isActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))", comment: "有効／無効"),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    target_article_id = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_attachment", x => x.id_file);
                });

            migrationBuilder.CreateTable(
                name: "t_part",
                columns: table => new
                {
                    id_part = table.Column<long>(type: "bigint", nullable: false),
                    part_number = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    version = table.Column<int>(type: "int", nullable: false),
                    file_data = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    type_data = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    format_data = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    file_texture = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    type_texture = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    file_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    file_length = table.Column<long>(type: "bigint", nullable: true),
                    itemlink = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    license = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    author = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    memo = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    AnimationClip = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_part", x => x.id_part);
                });

            migrationBuilder.CreateTable(
                name: "t_website_setting",
                columns: table => new
                {
                    title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    data = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    memo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_website_setting", x => x.title);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "t_article",
                columns: table => new
                {
                    id_article = table.Column<long>(type: "bigint", nullable: false),
                    id_assy = table.Column<long>(type: "bigint", nullable: true),
                    title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    short_description = table.Column<string>(type: "nvarchar(550)", maxLength: 550, nullable: true),
                    long_description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    meta_description = table.Column<string>(type: "nvarchar(550)", maxLength: 550, nullable: true),
                    meta_category = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    status = table.Column<short>(type: "smallint", nullable: false),
                    directional_light_color = table.Column<int>(type: "int", nullable: true),
                    directional_light_intensity = table.Column<double>(type: "float", nullable: true),
                    directional_light_px = table.Column<double>(type: "float", nullable: true),
                    directional_light_py = table.Column<double>(type: "float", nullable: true),
                    directional_light_pz = table.Column<double>(type: "float", nullable: true),
                    ambient_light_color = table.Column<int>(type: "int", nullable: true),
                    ambient_light_intensity = table.Column<double>(type: "float", nullable: true),
                    gammaOutput = table.Column<bool>(type: "bit", nullable: true),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    id_attachment_for_eye_catch = table.Column<long>(type: "bigint", nullable: true),
                    bg_color = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: true),
                    bg_c = table.Column<long>(type: "bigint", nullable: false),
                    bg_h = table.Column<double>(type: "float", nullable: false),
                    bg_s = table.Column<double>(type: "float", nullable: false),
                    bg_l = table.Column<double>(type: "float", nullable: false),
                    isStarrySky = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_product", x => x.id_article);
                    table.ForeignKey(
                        name: "FK_t_article_m_status_article",
                        column: x => x.status,
                        principalTable: "m_status_article",
                        principalColumn: "id");
                },
                comment: "総合的な製品情報を格納するテーブル");

            migrationBuilder.CreateTable(
                name: "t_annotation",
                columns: table => new
                {
                    id_article = table.Column<long>(type: "bigint", nullable: false),
                    id_annotation = table.Column<long>(type: "bigint", nullable: false),
                    title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    description1 = table.Column<string>(type: "nvarchar(550)", maxLength: 550, nullable: true),
                    description2 = table.Column<string>(type: "nvarchar(550)", maxLength: 550, nullable: true),
                    status = table.Column<short>(type: "smallint", nullable: false),
                    pos_x = table.Column<double>(type: "float", nullable: true),
                    pos_y = table.Column<double>(type: "float", nullable: true),
                    pos_z = table.Column<double>(type: "float", nullable: true),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_annotation", x => new { x.id_article, x.id_annotation });
                    table.ForeignKey(
                        name: "FK_t_annotation_t_article",
                        column: x => x.id_article,
                        principalTable: "t_article",
                        principalColumn: "id_article");
                });

            migrationBuilder.CreateTable(
                name: "t_instance_object",
                columns: table => new
                {
                    id_article = table.Column<long>(type: "bigint", nullable: false),
                    id_instance = table.Column<long>(type: "bigint", nullable: false),
                    id_part = table.Column<long>(type: "bigint", nullable: false),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    pos_x = table.Column<double>(type: "float", nullable: false),
                    pos_y = table.Column<double>(type: "float", nullable: false),
                    pos_z = table.Column<double>(type: "float", nullable: false),
                    scale = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_instance_object", x => new { x.id_article, x.id_instance });
                    table.ForeignKey(
                        name: "FK_t_instance_object_t_article",
                        column: x => x.id_article,
                        principalTable: "t_article",
                        principalColumn: "id_article");
                    table.ForeignKey(
                        name: "FK_t_instance_object_t_part",
                        column: x => x.id_part,
                        principalTable: "t_part",
                        principalColumn: "id_part");
                });

            migrationBuilder.CreateTable(
                name: "t_light",
                columns: table => new
                {
                    id_article = table.Column<long>(type: "bigint", nullable: false),
                    id_light = table.Column<long>(type: "bigint", nullable: false),
                    light_type = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    title = table.Column<string>(type: "nvarchar(550)", maxLength: 550, nullable: true),
                    short_description = table.Column<string>(type: "nvarchar(550)", maxLength: 550, nullable: true),
                    color = table.Column<long>(type: "bigint", nullable: true),
                    intensity = table.Column<double>(type: "float", nullable: true),
                    px = table.Column<double>(type: "float", nullable: true),
                    py = table.Column<double>(type: "float", nullable: true),
                    pz = table.Column<double>(type: "float", nullable: true),
                    distance = table.Column<double>(type: "float", nullable: true),
                    decay = table.Column<double>(type: "float", nullable: true),
                    power = table.Column<double>(type: "float", nullable: true),
                    shadow = table.Column<double>(type: "float", nullable: true),
                    tx = table.Column<double>(type: "float", nullable: true),
                    ty = table.Column<double>(type: "float", nullable: true),
                    tz = table.Column<double>(type: "float", nullable: true),
                    skycolor = table.Column<long>(type: "bigint", nullable: true),
                    groundcolor = table.Column<long>(type: "bigint", nullable: true),
                    is_lensflare = table.Column<bool>(type: "bit", nullable: false),
                    lfsize = table.Column<double>(type: "float", nullable: true),
                    file_data = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_light", x => new { x.id_article, x.id_light });
                    table.ForeignKey(
                        name: "FK_t_light_t_article",
                        column: x => x.id_article,
                        principalTable: "t_article",
                        principalColumn: "id_article");
                });

            migrationBuilder.CreateTable(
                name: "t_view",
                columns: table => new
                {
                    id_article = table.Column<long>(type: "bigint", nullable: false),
                    id_view = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    cam_pos_x = table.Column<double>(type: "float", nullable: true),
                    cam_pos_y = table.Column<double>(type: "float", nullable: true),
                    cam_pos_z = table.Column<double>(type: "float", nullable: true),
                    cam_lookat_x = table.Column<double>(type: "float", nullable: true),
                    cam_lookat_y = table.Column<double>(type: "float", nullable: true),
                    cam_lookat_z = table.Column<double>(type: "float", nullable: true),
                    cam_quat_x = table.Column<double>(type: "float", nullable: true),
                    cam_quat_y = table.Column<double>(type: "float", nullable: true),
                    cam_quat_z = table.Column<double>(type: "float", nullable: true),
                    cam_quat_w = table.Column<double>(type: "float", nullable: true),
                    obt_target_x = table.Column<double>(type: "float", nullable: true),
                    obt_target_y = table.Column<double>(type: "float", nullable: true),
                    obt_target_z = table.Column<double>(type: "float", nullable: true),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_view", x => new { x.id_article, x.id_view });
                    table.ForeignKey(
                        name: "FK_t_view_t_article",
                        column: x => x.id_article,
                        principalTable: "t_article",
                        principalColumn: "id_article");
                });

            migrationBuilder.CreateTable(
                name: "t_instruction",
                columns: table => new
                {
                    id_article = table.Column<long>(type: "bigint", nullable: false),
                    id_instruct = table.Column<long>(type: "bigint", nullable: false),
                    id_view = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    short_description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    memo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    subtitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    display_order = table.Column<long>(type: "bigint", nullable: false),
                    is_automatic_camera_rotate = table.Column<bool>(type: "bit", nullable: false),
                    display_instance_sets = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    model_action_settings = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_instruction", x => new { x.id_article, x.id_instruct });
                    table.ForeignKey(
                        name: "FK_t_instruction_t_article",
                        column: x => x.id_article,
                        principalTable: "t_article",
                        principalColumn: "id_article");
                    table.ForeignKey(
                        name: "FK_t_instruction_t_view",
                        columns: x => new { x.id_article, x.id_view },
                        principalTable: "t_view",
                        principalColumns: new[] { "id_article", "id_view" });
                });

            migrationBuilder.CreateTable(
                name: "t_annotation_display",
                columns: table => new
                {
                    id_article = table.Column<long>(type: "bigint", nullable: false),
                    id_instruct = table.Column<long>(type: "bigint", nullable: false),
                    id_annotation = table.Column<long>(type: "bigint", nullable: false),
                    is_display = table.Column<bool>(type: "bit", nullable: false),
                    is_display_description = table.Column<bool>(type: "bit", nullable: false),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_annotation_display", x => new { x.id_article, x.id_instruct, x.id_annotation });
                    table.ForeignKey(
                        name: "FK_t_annotation_display_t_annotation",
                        columns: x => new { x.id_article, x.id_annotation },
                        principalTable: "t_annotation",
                        principalColumns: new[] { "id_article", "id_annotation" });
                    table.ForeignKey(
                        name: "FK_t_annotation_display_t_instruction",
                        columns: x => new { x.id_article, x.id_instruct },
                        principalTable: "t_instruction",
                        principalColumns: new[] { "id_article", "id_instruct" });
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_t_annotation_display_id_article_id_annotation",
                table: "t_annotation_display",
                columns: new[] { "id_article", "id_annotation" });

            migrationBuilder.CreateIndex(
                name: "IX_t_article_status",
                table: "t_article",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "IX_t_instance_object_id_part",
                table: "t_instance_object",
                column: "id_part");

            migrationBuilder.CreateIndex(
                name: "IX_t_instruction_id_article_id_view",
                table: "t_instruction",
                columns: new[] { "id_article", "id_view" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "t_annotation_display");

            migrationBuilder.DropTable(
                name: "t_article_length_sumarry");

            migrationBuilder.DropTable(
                name: "t_attachment");

            migrationBuilder.DropTable(
                name: "t_instance_object");

            migrationBuilder.DropTable(
                name: "t_light");

            migrationBuilder.DropTable(
                name: "t_website_setting");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "t_annotation");

            migrationBuilder.DropTable(
                name: "t_instruction");

            migrationBuilder.DropTable(
                name: "t_part");

            migrationBuilder.DropTable(
                name: "t_view");

            migrationBuilder.DropTable(
                name: "t_article");

            migrationBuilder.DropTable(
                name: "m_status_article");
        }
    }
}
