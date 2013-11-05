namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Resume_Applicant : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Resume", "ApplicantId", "Applicant");
            DropIndex("Resume", new[] { "ApplicantId" });
            AddColumn("Resume", "Applicant_ApplicantID", c => c.Int());
            AddForeignKey("Resume", "Applicant_ApplicantID", "Applicant", "ApplicantID");
            CreateIndex("Resume", "Applicant_ApplicantID");
            DropColumn("Resume", "ApplicantId");
        }
        
        public override void Down()
        {
            AddColumn("Resume", "ApplicantId", c => c.Int(nullable: false));
            DropIndex("Resume", new[] { "Applicant_ApplicantID" });
            DropForeignKey("Resume", "Applicant_ApplicantID", "Applicant");
            DropColumn("Resume", "Applicant_ApplicantID");
            CreateIndex("Resume", "ApplicantId");
            AddForeignKey("Resume", "ApplicantId", "Applicant", "ApplicantID", cascadeDelete: true);
        }
    }
}
