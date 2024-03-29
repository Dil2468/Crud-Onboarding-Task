﻿// <auto-generated />
using System;
using FirstTask.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FirstTask.Migrations
{
    [DbContext(typeof(EFContext))]
    [Migration("20221212001626_task1")]
    partial class task1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("FirstTask.Model.Customer", b =>
                {
                    b.Property<int>("CusID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CusID"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CusName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CusID");

                    b.ToTable("Customer1");
                });

            modelBuilder.Entity("FirstTask.Model.Product", b =>
                {
                    b.Property<int>("ProdId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProdId"), 1L, 1);

                    b.Property<double?>("Price")
                        .HasColumnType("float");

                    b.Property<string>("ProdName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProdId");

                    b.ToTable("Product1");
                });

            modelBuilder.Entity("FirstTask.Model.Sales", b =>
                {
                    b.Property<int>("SalesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SalesId"), 1L, 1);

                    b.Property<int>("CustomerID")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateSold")
                        .HasColumnType("datetime2");

                    b.Property<int>("ProductID")
                        .HasColumnType("int");

                    b.Property<int>("StoreID")
                        .HasColumnType("int");

                    b.HasKey("SalesId");

                    b.HasIndex("CustomerID");

                    b.HasIndex("ProductID");

                    b.HasIndex("StoreID");

                    b.ToTable("Sale1");
                });

            modelBuilder.Entity("FirstTask.Model.Store", b =>
                {
                    b.Property<int>("StorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StorId"), 1L, 1);

                    b.Property<string>("StorAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StorName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StorId");

                    b.ToTable("Store1");
                });

            modelBuilder.Entity("FirstTask.Model.Sales", b =>
                {
                    b.HasOne("FirstTask.Model.Customer", "customer")
                        .WithMany("Sale")
                        .HasForeignKey("CustomerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FirstTask.Model.Product", "product")
                        .WithMany("Sale")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FirstTask.Model.Store", "store")
                        .WithMany("Sale")
                        .HasForeignKey("StoreID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("customer");

                    b.Navigation("product");

                    b.Navigation("store");
                });

            modelBuilder.Entity("FirstTask.Model.Customer", b =>
                {
                    b.Navigation("Sale");
                });

            modelBuilder.Entity("FirstTask.Model.Product", b =>
                {
                    b.Navigation("Sale");
                });

            modelBuilder.Entity("FirstTask.Model.Store", b =>
                {
                    b.Navigation("Sale");
                });
#pragma warning restore 612, 618
        }
    }
}
