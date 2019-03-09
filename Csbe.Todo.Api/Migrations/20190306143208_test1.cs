using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Csbe.Todo.Api.Migrations
{
    public partial class test1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salt",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Salt",
                table: "Users",
                nullable: true);
        }
    }
}
