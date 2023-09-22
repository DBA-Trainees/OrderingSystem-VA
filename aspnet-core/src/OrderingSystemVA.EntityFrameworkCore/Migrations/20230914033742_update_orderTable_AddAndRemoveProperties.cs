using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystemVA.Migrations
{
    /// <inheritdoc />
    public partial class update_orderTable_AddAndRemoveProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "isChecked",
                table: "Orders");

            migrationBuilder.AddColumn<decimal>(
                name: "FoodPrice",
                table: "Orders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FoodPrice",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isChecked",
                table: "Orders",
                type: "bit",
                nullable: true);
        }
    }
}
