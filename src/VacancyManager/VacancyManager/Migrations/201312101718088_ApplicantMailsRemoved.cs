namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantMailsRemoved : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("VMMailMessage", "ApplicantId", "Applicant");
            DropIndex("VMMailMessage", new[] { "ApplicantId" });
        }
        
        public override void Down()
        {
            CreateIndex("VMMailMessage", "ApplicantId");
            AddForeignKey("VMMailMessage", "ApplicantId", "Applicant", "ApplicantID");
        }
    }
}
