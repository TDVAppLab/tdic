using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class addCokPID02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_instance_object_t_part",
                table: "t_instance_object");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_part",
                table: "t_part");

            migrationBuilder.DropIndex(
                name: "IX_t_instance_object_id_part",
                table: "t_instance_object");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_part_guid",
                table: "t_part",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_part",
                table: "t_part",
                column: "id_part_guid");

            migrationBuilder.CreateIndex(
                name: "IX_t_instance_object_id_part_guid",
                table: "t_instance_object",
                column: "id_part_guid");

            migrationBuilder.AddForeignKey(
                name: "FK_t_instance_object_t_part",
                table: "t_instance_object",
                column: "id_part_guid",
                principalTable: "t_part",
                principalColumn: "id_part_guid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_instance_object_t_part",
                table: "t_instance_object");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_part",
                table: "t_part");

            migrationBuilder.DropIndex(
                name: "IX_t_instance_object_id_part_guid",
                table: "t_instance_object");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_part_guid",
                table: "t_part",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_part",
                table: "t_part",
                column: "id_part");

            migrationBuilder.CreateIndex(
                name: "IX_t_instance_object_id_part",
                table: "t_instance_object",
                column: "id_part");

            migrationBuilder.AddForeignKey(
                name: "FK_t_instance_object_t_part",
                table: "t_instance_object",
                column: "id_part",
                principalTable: "t_part",
                principalColumn: "id_part");
        }
    }
}
