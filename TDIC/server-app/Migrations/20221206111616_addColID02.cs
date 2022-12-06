using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class addColID02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_annotation_t_article",
                table: "t_annotation");

            migrationBuilder.DropForeignKey(
                name: "FK_t_annotation_display_t_annotation",
                table: "t_annotation_display");

            migrationBuilder.DropForeignKey(
                name: "FK_t_annotation_display_t_instruction",
                table: "t_annotation_display");

            migrationBuilder.DropForeignKey(
                name: "FK_t_instance_object_t_article",
                table: "t_instance_object");

            migrationBuilder.DropForeignKey(
                name: "FK_t_instruction_t_article",
                table: "t_instruction");

            migrationBuilder.DropForeignKey(
                name: "FK_t_instruction_t_view",
                table: "t_instruction");

            migrationBuilder.DropForeignKey(
                name: "FK_t_light_t_article",
                table: "t_light");

            migrationBuilder.DropForeignKey(
                name: "FK_t_view_t_article",
                table: "t_view");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_view",
                table: "t_view");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_light",
                table: "t_light");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_instruction",
                table: "t_instruction");

            migrationBuilder.DropIndex(
                name: "IX_t_instruction_id_article_id_view",
                table: "t_instruction");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_instance_object",
                table: "t_instance_object");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_product",
                table: "t_article");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_annotation_display",
                table: "t_annotation_display");

            migrationBuilder.DropIndex(
                name: "IX_t_annotation_display_id_article_id_annotation",
                table: "t_annotation_display");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_annotation",
                table: "t_annotation");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_view",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_light",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_instruction",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_instance_object",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_article",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_annotation_display",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_annotation",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_view",
                table: "t_view",
                columns: new[] { "id_article_uid", "id_view" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_light",
                table: "t_light",
                columns: new[] { "id_article_uid", "id_light" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_instruction",
                table: "t_instruction",
                columns: new[] { "id_article_uid", "id_instruct" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_instance_object",
                table: "t_instance_object",
                columns: new[] { "id_article_uid", "id_instance" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_product",
                table: "t_article",
                column: "id_article_uid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_annotation_display",
                table: "t_annotation_display",
                columns: new[] { "id_article_uid", "id_instruct", "id_annotation" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_annotation",
                table: "t_annotation",
                columns: new[] { "id_article_uid", "id_annotation" });

            migrationBuilder.CreateIndex(
                name: "IX_t_instruction_id_article_uid_id_view",
                table: "t_instruction",
                columns: new[] { "id_article_uid", "id_view" });

            migrationBuilder.CreateIndex(
                name: "IX_t_annotation_display_id_article_uid_id_annotation",
                table: "t_annotation_display",
                columns: new[] { "id_article_uid", "id_annotation" });

            migrationBuilder.AddForeignKey(
                name: "FK_t_annotation_t_article",
                table: "t_annotation",
                column: "id_article_uid",
                principalTable: "t_article",
                principalColumn: "id_article_uid");

            migrationBuilder.AddForeignKey(
                name: "FK_t_annotation_display_t_annotation",
                table: "t_annotation_display",
                columns: new[] { "id_article_uid", "id_annotation" },
                principalTable: "t_annotation",
                principalColumns: new[] { "id_article_uid", "id_annotation" });

            migrationBuilder.AddForeignKey(
                name: "FK_t_annotation_display_t_instruction",
                table: "t_annotation_display",
                columns: new[] { "id_article_uid", "id_instruct" },
                principalTable: "t_instruction",
                principalColumns: new[] { "id_article_uid", "id_instruct" });

            migrationBuilder.AddForeignKey(
                name: "FK_t_instance_object_t_article",
                table: "t_instance_object",
                column: "id_article_uid",
                principalTable: "t_article",
                principalColumn: "id_article_uid");

            migrationBuilder.AddForeignKey(
                name: "FK_t_instruction_t_article",
                table: "t_instruction",
                column: "id_article_uid",
                principalTable: "t_article",
                principalColumn: "id_article_uid");

            migrationBuilder.AddForeignKey(
                name: "FK_t_instruction_t_view",
                table: "t_instruction",
                columns: new[] { "id_article_uid", "id_view" },
                principalTable: "t_view",
                principalColumns: new[] { "id_article_uid", "id_view" });

            migrationBuilder.AddForeignKey(
                name: "FK_t_light_t_article",
                table: "t_light",
                column: "id_article_uid",
                principalTable: "t_article",
                principalColumn: "id_article_uid");

            migrationBuilder.AddForeignKey(
                name: "FK_t_view_t_article",
                table: "t_view",
                column: "id_article_uid",
                principalTable: "t_article",
                principalColumn: "id_article_uid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_annotation_t_article",
                table: "t_annotation");

            migrationBuilder.DropForeignKey(
                name: "FK_t_annotation_display_t_annotation",
                table: "t_annotation_display");

            migrationBuilder.DropForeignKey(
                name: "FK_t_annotation_display_t_instruction",
                table: "t_annotation_display");

            migrationBuilder.DropForeignKey(
                name: "FK_t_instance_object_t_article",
                table: "t_instance_object");

            migrationBuilder.DropForeignKey(
                name: "FK_t_instruction_t_article",
                table: "t_instruction");

            migrationBuilder.DropForeignKey(
                name: "FK_t_instruction_t_view",
                table: "t_instruction");

            migrationBuilder.DropForeignKey(
                name: "FK_t_light_t_article",
                table: "t_light");

            migrationBuilder.DropForeignKey(
                name: "FK_t_view_t_article",
                table: "t_view");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_view",
                table: "t_view");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_light",
                table: "t_light");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_instruction",
                table: "t_instruction");

            migrationBuilder.DropIndex(
                name: "IX_t_instruction_id_article_uid_id_view",
                table: "t_instruction");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_instance_object",
                table: "t_instance_object");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_product",
                table: "t_article");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_annotation_display",
                table: "t_annotation_display");

            migrationBuilder.DropIndex(
                name: "IX_t_annotation_display_id_article_uid_id_annotation",
                table: "t_annotation_display");

            migrationBuilder.DropPrimaryKey(
                name: "PK_t_annotation",
                table: "t_annotation");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_view",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_light",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_instruction",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_instance_object",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_article",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_annotation_display",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "id_article_uid",
                table: "t_annotation",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_view",
                table: "t_view",
                columns: new[] { "id_article", "id_view" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_light",
                table: "t_light",
                columns: new[] { "id_article", "id_light" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_instruction",
                table: "t_instruction",
                columns: new[] { "id_article", "id_instruct" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_instance_object",
                table: "t_instance_object",
                columns: new[] { "id_article", "id_instance" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_product",
                table: "t_article",
                column: "id_article");

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_annotation_display",
                table: "t_annotation_display",
                columns: new[] { "id_article", "id_instruct", "id_annotation" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_t_annotation",
                table: "t_annotation",
                columns: new[] { "id_article", "id_annotation" });

            migrationBuilder.CreateIndex(
                name: "IX_t_instruction_id_article_id_view",
                table: "t_instruction",
                columns: new[] { "id_article", "id_view" });

            migrationBuilder.CreateIndex(
                name: "IX_t_annotation_display_id_article_id_annotation",
                table: "t_annotation_display",
                columns: new[] { "id_article", "id_annotation" });

            migrationBuilder.AddForeignKey(
                name: "FK_t_annotation_t_article",
                table: "t_annotation",
                column: "id_article",
                principalTable: "t_article",
                principalColumn: "id_article");

            migrationBuilder.AddForeignKey(
                name: "FK_t_annotation_display_t_annotation",
                table: "t_annotation_display",
                columns: new[] { "id_article", "id_annotation" },
                principalTable: "t_annotation",
                principalColumns: new[] { "id_article", "id_annotation" });

            migrationBuilder.AddForeignKey(
                name: "FK_t_annotation_display_t_instruction",
                table: "t_annotation_display",
                columns: new[] { "id_article", "id_instruct" },
                principalTable: "t_instruction",
                principalColumns: new[] { "id_article", "id_instruct" });

            migrationBuilder.AddForeignKey(
                name: "FK_t_instance_object_t_article",
                table: "t_instance_object",
                column: "id_article",
                principalTable: "t_article",
                principalColumn: "id_article");

            migrationBuilder.AddForeignKey(
                name: "FK_t_instruction_t_article",
                table: "t_instruction",
                column: "id_article",
                principalTable: "t_article",
                principalColumn: "id_article");

            migrationBuilder.AddForeignKey(
                name: "FK_t_instruction_t_view",
                table: "t_instruction",
                columns: new[] { "id_article", "id_view" },
                principalTable: "t_view",
                principalColumns: new[] { "id_article", "id_view" });

            migrationBuilder.AddForeignKey(
                name: "FK_t_light_t_article",
                table: "t_light",
                column: "id_article",
                principalTable: "t_article",
                principalColumn: "id_article");

            migrationBuilder.AddForeignKey(
                name: "FK_t_view_t_article",
                table: "t_view",
                column: "id_article",
                principalTable: "t_article",
                principalColumn: "id_article");
        }
    }
}
