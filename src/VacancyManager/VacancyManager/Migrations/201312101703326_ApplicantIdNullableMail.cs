namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantIdNullableMail : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("VMMailMessage", "ApplicantId", "Applicant");
            DropIndex("VMMailMessage", new[] { "ApplicantId" });
            AlterColumn("VMMailMessage", "ApplicantId", c => c.Int());
            AddForeignKey("VMMailMessage", "ApplicantId", "Applicant", "ApplicantID");
            CreateIndex("VMMailMessage", "ApplicantId");
        }
        
        public override void Down()
        {
            DropIndex("VMMailMessage", new[] { "ApplicantId" });
            DropForeignKey("VMMailMessage", "ApplicantId", "Applicant");
            AlterColumn("VMMailMessage", "ApplicantId", c => c.Int(nullable: false));
            CreateIndex("VMMailMessage", "ApplicantId");
            AddForeignKey("VMMailMessage", "ApplicantId", "Applicant", "ApplicantID", cascadeDelete: true);
        }
    }
}
