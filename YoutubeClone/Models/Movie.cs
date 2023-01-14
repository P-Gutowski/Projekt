using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoutubeClone.Models
{
    public class Movie : BaseAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public ApplicationUser? Owner { get; set; }

        [Required]
        public string SourceFileName { get; set; }

        public virtual ICollection<Tag> Tags { get; set; } = new HashSet<Tag>();
        public ICollection<Comment> Comments { get; set; } = new HashSet<Comment>();
        public ICollection<Rating> Ratings { get; set; } = new HashSet<Rating>();
    }
}
