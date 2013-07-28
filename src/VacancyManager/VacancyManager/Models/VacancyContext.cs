using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace VacancyManager.Models
{
  public class VacancyContext : DbContext
  {
    public DbSet<Consideration> Considerations { get; set; }
    public DbSet<Resume> Resumes { get; set; }
    public DbSet<Vacancy> Vacancies { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Commentaries { get; set; }
    public DbSet<File> Files { get; set; }
    public DbSet<PreviousExperience> PreviousExperiences { get; set; }
    public DbSet<Education> Educations { get; set; }
    public DbSet<RequirementStack> RequirementStacks { get; set; }
    public DbSet<Requirement> Requirements { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<VacancyRequirement> VacancyRequirements { get; set; }
    public DbSet<SysConfig> SysConfigs { get; set; }
    public DbSet<Applicant> Applicants { get; set; }
    public DbSet<ApplicantRequirement> ApplicantRequirements { get; set; }
    public DbSet<VMMailMessage> VMMailMessages { get; set; }  
    public DbSet<Attachment> Attachments { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
      /*
       * Если не написать сл. строчку таблицы будут иметь вид Comments/Files/Users и т.д,
       * В нашем проекте таблицы будут иметь одиночное значение.
       */
      modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
    }
  }
}