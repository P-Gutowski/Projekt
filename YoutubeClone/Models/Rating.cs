using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.Models
{
    public class Rating
    {
        public int ID { get; set; }

        [Required]
        public ApplicationUser Owner { get; set; }

        [Required]
        public Movie Movie { get; set; }

        [Required]
        public int Value { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
