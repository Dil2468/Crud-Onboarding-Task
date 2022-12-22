using System.ComponentModel.DataAnnotations;

namespace FirstTask.Model
{
    public class Product
    {

        [Key]
        public int ProdId { get; set; }

        public string? ProdName { get; set; }

        public double? Price { get; set; }

        public ICollection<Sales>? Sale { get; set; }
    }
}
