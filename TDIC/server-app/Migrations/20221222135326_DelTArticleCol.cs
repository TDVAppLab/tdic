using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class DelTArticleCol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ambient_light_color",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "ambient_light_intensity",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "bg_c",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "bg_h",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "bg_l",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "bg_s",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "directional_light_color",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "directional_light_intensity",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "directional_light_px",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "directional_light_py",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "directional_light_pz",
                table: "t_article");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ambient_light_color",
                table: "t_article",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ambient_light_intensity",
                table: "t_article",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "bg_c",
                table: "t_article",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<double>(
                name: "bg_h",
                table: "t_article",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "bg_l",
                table: "t_article",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "bg_s",
                table: "t_article",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "directional_light_color",
                table: "t_article",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "directional_light_intensity",
                table: "t_article",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "directional_light_px",
                table: "t_article",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "directional_light_py",
                table: "t_article",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "directional_light_pz",
                table: "t_article",
                type: "float",
                nullable: true);
        }
    }
}
