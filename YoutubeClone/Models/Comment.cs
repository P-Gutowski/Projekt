using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.Models
{
    public class Comment
    {
        public int ID { get; set; }

        [Required]
        public ApplicationUser Owner { get; set; }

        [Required]
        public Movie Movie { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
