namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class VmmailMessage_ApplicantIdAdded : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("VMMailMessage", "Applicant_ApplicantID", "Applicant");
            DropIndex("VMMailMessage", new[] { "Applicant_ApplicantID" });
            RenameColumn(table: "VMMailMessage", name: "Applicant_ApplicantID", newName: "ApplicantId");
            AddForeignKey("VMMailMessage", "ApplicantId", "Applicant", "ApplicantID", cascadeDelete: true);
            CreateIndex("VMMailMessage", "ApplicantId");
        }
        
        public override void Down()
        {
            DropIndex("VMMailMessage", new[] { "ApplicantId" });
            DropForeignKey("VMMailMessage", "ApplicantId", "Applicant");
            RenameColumn(table: "VMMailMessage", name: "ApplicantId", newName: "Applicant_ApplicantID");
            CreateIndex("VMMailMessage", "Applicant_ApplicantID");
            AddForeignKey("VMMailMessage", "Applicant_ApplicantID", "Applicant", "ApplicantID");
        }
    }
}
