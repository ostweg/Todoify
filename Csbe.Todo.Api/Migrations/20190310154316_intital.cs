using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Csbe.Todo.Api.Migrations
{
    public partial class intital : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PwSalt",
                table: "Users");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishDate",
                table: "TodoItems",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Importance",
                table: "TodoItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinishDate",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "Importance",
                table: "TodoItems");

            migrationBuilder.AddColumn<byte[]>(
                name: "PwSalt",
                table: "Users",
                nullable: true);
        }
    }
}
