using System.ComponentModel.DataAnnotations;

namespace FirstTask.Model
{
    public class Sales
    {

        [Key]

        public int SalesId { get; set; }

        public DateTime DateSold { get; set; }

        public int CustomerID { get; set; }

        public Customer? customer { get; set; }


        public int ProductID { get; set; }

        public Product? product { get; set; }

        public int StoreID { get; set; }

        public Store? store { get; set; }
    }
}
