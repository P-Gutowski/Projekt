using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoutubeClone.Models
{
    public class Comment : BaseAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public ApplicationUser? Owner { get; set; }

        [Required]
        public Movie Movie { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
