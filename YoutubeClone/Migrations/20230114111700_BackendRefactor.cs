using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoutubeClone.Migrations
{
    /// <inheritdoc />
    public partial class BackendRefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_ApplicationUser_OwnerId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Movies_ApplicationUser_OwnerId",
                table: "Movies");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_ApplicationUser_OwnerId",
                table: "Ratings");

            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "Movies",
                newName: "SourceFileName");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Ratings",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Movies",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Comments",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_ApplicationUser_OwnerId",
                table: "Comments",
                column: "OwnerId",
                principalTable: "ApplicationUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_ApplicationUser_OwnerId",
                table: "Movies",
                column: "OwnerId",
                principalTable: "ApplicationUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_ApplicationUser_OwnerId",
                table: "Ratings",
                column: "OwnerId",
                principalTable: "ApplicationUser",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_ApplicationUser_OwnerId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Movies_ApplicationUser_OwnerId",
                table: "Movies");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_ApplicationUser_OwnerId",
                table: "Ratings");

            migrationBuilder.RenameColumn(
                name: "SourceFileName",
                table: "Movies",
                newName: "FilePath");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Ratings",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Movies",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Comments",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_ApplicationUser_OwnerId",
                table: "Comments",
                column: "OwnerId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_ApplicationUser_OwnerId",
                table: "Movies",
                column: "OwnerId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_ApplicationUser_OwnerId",
                table: "Ratings",
                column: "OwnerId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
