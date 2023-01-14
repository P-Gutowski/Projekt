namespace YoutubeClone.Models
{
    public abstract class BaseAbstract
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ModifiedAt { get; set; } = DateTime.Now;
    }
}
