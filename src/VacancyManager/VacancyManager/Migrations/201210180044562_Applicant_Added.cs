namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Applicant_Added : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "Applicant",
                c => new
                    {
                        ApplicantID = c.Int(nullable: false, identity: true),
                        FIO = c.String(),
                        ContactPhone = c.String(),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.ApplicantID);
            
            AddColumn("Comment", "Applicant_ApplicantID", c => c.Int());
            AddColumn("Resume", "Applicant_ApplicantID", c => c.Int());
            AddColumn("File", "Applicant_ApplicantID", c => c.Int());
            AddForeignKey("Consideration", "ApplicantID", "Applicant", "ApplicantID", cascadeDelete: true);
            AddForeignKey("Comment", "Applicant_ApplicantID", "Applicant", "ApplicantID");
            AddForeignKey("Resume", "Applicant_ApplicantID", "Applicant", "ApplicantID");
            AddForeignKey("File", "Applicant_ApplicantID", "Applicant", "ApplicantID");
            CreateIndex("Consideration", "ApplicantID");
            CreateIndex("Comment", "Applicant_ApplicantID");
            CreateIndex("Resume", "Applicant_ApplicantID");
            CreateIndex("File", "Applicant_ApplicantID");
        }
        
        public override void Down()
        {
            DropIndex("File", new[] { "Applicant_ApplicantID" });
            DropIndex("Resume", new[] { "Applicant_ApplicantID" });
            DropIndex("Comment", new[] { "Applicant_ApplicantID" });
            DropIndex("Consideration", new[] { "ApplicantID" });
            DropForeignKey("File", "Applicant_ApplicantID", "Applicant");
            DropForeignKey("Resume", "Applicant_ApplicantID", "Applicant");
            DropForeignKey("Comment", "Applicant_ApplicantID", "Applicant");
            DropForeignKey("Consideration", "ApplicantID", "Applicant");
            DropColumn("File", "Applicant_ApplicantID");
            DropColumn("Resume", "Applicant_ApplicantID");
            DropColumn("Comment", "Applicant_ApplicantID");
            DropTable("Applicant");
        }
    }
}
