using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using YoutubeClone.Models;

namespace YoutubeClone.Data
{
    public class MovieDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions) { }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("User ID=postgres;Password=postgres;Server=localhost;Port=5432;Database=youtube_clone;");
    }
}
