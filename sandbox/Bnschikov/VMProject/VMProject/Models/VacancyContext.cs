using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace VMProject.Models
{
    public class VacancyContext : DbContext
    {
        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<Vacancy> Vacancies { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<Vacancy>()
                .HasMany(c => c.Applicants)
                .WithMany(i => i.Vacancies)
                .Map(t => t.MapLeftKey("VacancyID").MapRightKey("ApplicantID").ToTable("VacancyApplicant"));
        }
    }
}