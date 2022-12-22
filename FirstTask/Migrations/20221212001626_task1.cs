using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FirstTask.Migrations
{
    public partial class task1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customer1",
                columns: table => new
                {
                    CusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CusName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer1", x => x.CusID);
                });

            migrationBuilder.CreateTable(
                name: "Product1",
                columns: table => new
                {
                    ProdId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProdName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product1", x => x.ProdId);
                });

            migrationBuilder.CreateTable(
                name: "Store1",
                columns: table => new
                {
                    StorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StorName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StorAddress = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Store1", x => x.StorId);
                });

            migrationBuilder.CreateTable(
                name: "Sale1",
                columns: table => new
                {
                    SalesId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateSold = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerID = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    StoreID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sale1", x => x.SalesId);
                    table.ForeignKey(
                        name: "FK_Sale1_Customer1_CustomerID",
                        column: x => x.CustomerID,
                        principalTable: "Customer1",
                        principalColumn: "CusID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sale1_Product1_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Product1",
                        principalColumn: "ProdId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sale1_Store1_StoreID",
                        column: x => x.StoreID,
                        principalTable: "Store1",
                        principalColumn: "StorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sale1_CustomerID",
                table: "Sale1",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_Sale1_ProductID",
                table: "Sale1",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Sale1_StoreID",
                table: "Sale1",
                column: "StoreID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sale1");

            migrationBuilder.DropTable(
                name: "Customer1");

            migrationBuilder.DropTable(
                name: "Product1");

            migrationBuilder.DropTable(
                name: "Store1");
        }
    }
}
