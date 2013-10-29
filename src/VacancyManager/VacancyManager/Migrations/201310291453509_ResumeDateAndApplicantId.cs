namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ResumeDateAndApplicantId : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Resume", "Applicant_ApplicantID", "Applicant");
            DropIndex("Resume", new[] { "Applicant_ApplicantID" });
            RenameColumn(table: "Resume", name: "Applicant_ApplicantID", newName: "ApplicantId");
            AddColumn("Resume", "Date", c => c.DateTime(nullable: false));
            AddForeignKey("Resume", "ApplicantId", "Applicant", "ApplicantID", cascadeDelete: true);
            CreateIndex("Resume", "ApplicantId");
        }
        
        public override void Down()
        {
            DropIndex("Resume", new[] { "ApplicantId" });
            DropForeignKey("Resume", "ApplicantId", "Applicant");
            DropColumn("Resume", "Date");
            RenameColumn(table: "Resume", name: "ApplicantId", newName: "Applicant_ApplicantID");
            CreateIndex("Resume", "Applicant_ApplicantID");
            AddForeignKey("Resume", "Applicant_ApplicantID", "Applicant", "ApplicantID");
        }
    }
}
