using FirstTask.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace FirstTask.DataContext
{
    public class EFContext : DbContext
    {

        public EFContext(DbContextOptions<EFContext> options) : base(options)


        { }

        public DbSet<Customer> Customer1 { get; set; }
        public DbSet<Product> Product1 { get; set; }

        public DbSet<Store> Store1 { get; set; }

        public DbSet<Sales> Sale1 { get; set; }

    }

}
