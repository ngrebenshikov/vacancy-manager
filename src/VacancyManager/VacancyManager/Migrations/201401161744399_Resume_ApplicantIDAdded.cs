namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Resume_ApplicantIDAdded : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Resume", "Applicant_ApplicantID", "Applicant");
            DropIndex("Resume", new[] { "Applicant_ApplicantID" });
            RenameColumn(table: "Resume", name: "Applicant_ApplicantID", newName: "ApplicantID");
            AddForeignKey("Resume", "ApplicantID", "Applicant", "ApplicantID", cascadeDelete: true);
            CreateIndex("Resume", "ApplicantID");
        }
        
        public override void Down()
        {
            DropIndex("Resume", new[] { "ApplicantID" });
            DropForeignKey("Resume", "ApplicantID", "Applicant");
            RenameColumn(table: "Resume", name: "ApplicantID", newName: "Applicant_ApplicantID");
            CreateIndex("Resume", "Applicant_ApplicantID");
            AddForeignKey("Resume", "Applicant_ApplicantID", "Applicant", "ApplicantID");
        }
    }
}
