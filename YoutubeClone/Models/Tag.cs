using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.Models
{
    public class Tag
    {
        public Tag()
        {
            this.Movies = new HashSet<Movie>();
        }
        public int ID { get; set; }

        [Required]
        public string Content { get; set; }

        public virtual ICollection<Movie> Movies { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
