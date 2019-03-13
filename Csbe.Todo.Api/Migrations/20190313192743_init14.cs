using Microsoft.EntityFrameworkCore.Migrations;

namespace Csbe.Todo.Api.Migrations
{
    public partial class init14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "TodoItems");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "TodoItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "TodoItems");

            migrationBuilder.AddColumn<long>(
                name: "CreatedById",
                table: "TodoItems",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
