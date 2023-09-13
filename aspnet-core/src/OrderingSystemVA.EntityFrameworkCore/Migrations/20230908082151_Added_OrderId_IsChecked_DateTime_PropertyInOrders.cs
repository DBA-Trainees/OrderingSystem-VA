using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystemVA.Migrations
{
    /// <inheritdoc />
    public partial class Added_OrderId_IsChecked_DateTime_PropertyInOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isActive",
                table: "Orders",
                newName: "isChecked");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isChecked",
                table: "Orders",
                newName: "isActive");
        }
    }
}
