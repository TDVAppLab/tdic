using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class articleSceneParams01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "environment",
                table: "t_article",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "exposure",
                table: "t_article",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "outputEncoding",
                table: "t_article",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "toneMapping",
                table: "t_article",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "environment",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "exposure",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "outputEncoding",
                table: "t_article");

            migrationBuilder.DropColumn(
                name: "toneMapping",
                table: "t_article");
        }
    }
}
