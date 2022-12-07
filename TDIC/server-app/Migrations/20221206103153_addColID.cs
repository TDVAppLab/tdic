using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class addColID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "id_article_uid",
                table: "t_view",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "id_article_uid",
                table: "t_light",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "id_article_uid",
                table: "t_instruction",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "id_article_uid",
                table: "t_instance_object",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "id_article_uid",
                table: "t_annotation_display",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "id_article_uid",
                table: "t_annotation",
                type: "uniqueidentifier",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "id_article_uid",
                table: "t_view");

            migrationBuilder.DropColumn(
                name: "id_article_uid",
                table: "t_light");

            migrationBuilder.DropColumn(
                name: "id_article_uid",
                table: "t_instruction");

            migrationBuilder.DropColumn(
                name: "id_article_uid",
                table: "t_instance_object");

            migrationBuilder.DropColumn(
                name: "id_article_uid",
                table: "t_annotation_display");

            migrationBuilder.DropColumn(
                name: "id_article_uid",
                table: "t_annotation");
        }
    }
}
