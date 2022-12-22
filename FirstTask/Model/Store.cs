using System.ComponentModel.DataAnnotations;

namespace FirstTask.Model
{
    public class Store
    {

        [Key]

        public int StorId { get; set; }

        public string? StorName { get; set; }


        public string? StorAddress { get; set; }

        public ICollection<Sales>? Sale { get; set; }
    }
}
