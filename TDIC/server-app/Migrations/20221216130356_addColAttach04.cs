using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class addColAttach04 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_t_attachment",
                table: "t_attachment");

            migrationBuilder.DropColumn(
                name: "id_file_guid",
                table: "t_attachment");

            migrationBuilder.DropColumn(
                name: "id_attachment_for_eye_catch_guid",
                table: "t_article");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_file",
                table: "t_attachment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "id_attachment_for_eye_catch",
                table: "t_article",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_attachment",
                table: "t_attachment",
                column: "id_file");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_t_attachment",
                table: "t_attachment");

            migrationBuilder.AlterColumn<string>(
                name: "id_file",
                table: "t_attachment",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "id_file_guid",
                table: "t_attachment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "id_attachment_for_eye_catch",
                table: "t_article",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "id_attachment_for_eye_catch_guid",
                table: "t_article",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_attachment",
                table: "t_attachment",
                column: "id_file_guid");
        }
    }
}
