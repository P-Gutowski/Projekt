using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.Models
{
    public class Movie
    {
        public Movie()
        {
            this.Tags = new HashSet<Tag>();
        }

        public int ID { get; set; }

        [Required]
        public ApplicationUser Owner { get; set; }

        [Required]
        public string FilePath { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
