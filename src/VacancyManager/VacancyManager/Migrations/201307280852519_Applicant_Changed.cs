namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Applicant_Changed : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("ApplicantMailMessage", "ApplicantId", "Applicant");
            DropIndex("ApplicantMailMessage", new[] { "ApplicantId" });
            AddColumn("VMMailMessage", "Applicant_ApplicantID", c => c.Int());
            AddForeignKey("VMMailMessage", "Applicant_ApplicantID", "Applicant", "ApplicantID");
            CreateIndex("VMMailMessage", "Applicant_ApplicantID");
            DropTable("ApplicantMailMessage");
        }
        
        public override void Down()
        {
            CreateTable(
                "ApplicantMailMessage",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ApplicantId = c.Int(nullable: false),
                        VMMailMessageId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            DropIndex("VMMailMessage", new[] { "Applicant_ApplicantID" });
            DropForeignKey("VMMailMessage", "Applicant_ApplicantID", "Applicant");
            DropColumn("VMMailMessage", "Applicant_ApplicantID");
            CreateIndex("ApplicantMailMessage", "ApplicantId");
            AddForeignKey("ApplicantMailMessage", "ApplicantId", "Applicant", "ApplicantID", cascadeDelete: true);
        }
    }
}
