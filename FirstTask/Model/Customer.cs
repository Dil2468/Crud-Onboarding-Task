using System.ComponentModel.DataAnnotations;

namespace FirstTask.Model
{
    public class Customer
    {
        [Key]
        public int CusID { get; set; }
        public string? CusName { get; set; }

        public string? Address { get; set; }

        public ICollection<Sales>? Sale { get; set; }
    }
}
