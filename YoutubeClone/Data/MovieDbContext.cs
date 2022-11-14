using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Runtime.Intrinsics.Arm;
using YoutubeClone.Models;

namespace YoutubeClone.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext() : base("MovieDbContext")
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
