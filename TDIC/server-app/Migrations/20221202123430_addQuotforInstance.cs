using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class addQuotforInstance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "quaternion_w",
                table: "t_instance_object",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "quaternion_x",
                table: "t_instance_object",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "quaternion_y",
                table: "t_instance_object",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "quaternion_z",
                table: "t_instance_object",
                type: "float",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "quaternion_w",
                table: "t_instance_object");

            migrationBuilder.DropColumn(
                name: "quaternion_x",
                table: "t_instance_object");

            migrationBuilder.DropColumn(
                name: "quaternion_y",
                table: "t_instance_object");

            migrationBuilder.DropColumn(
                name: "quaternion_z",
                table: "t_instance_object");
        }
    }
}
