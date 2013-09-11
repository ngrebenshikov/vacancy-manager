using System.Data.Entity;
using AppTEST.Models;
namespace MVC3AppCodeFirst.Models
{
    public class AppTESTContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Posts { get; set; }
        public DbSet<Contacts1> Contacts { get; set; }
    }

}