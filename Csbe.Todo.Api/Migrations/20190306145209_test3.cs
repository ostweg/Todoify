using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Csbe.Todo.Api.Migrations
{
    public partial class test3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "PwSalt",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PwSalt",
                table: "Users");
        }
    }
}
