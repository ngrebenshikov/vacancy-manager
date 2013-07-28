namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantMailMessagesAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "ApplicantMailMessage",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ApplicantId = c.Int(nullable: false),
                        MailMessageID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("Applicant", t => t.ApplicantId, cascadeDelete: true)
                .Index(t => t.ApplicantId);
            
            AddColumn("VMMailMessage", "ApplicantMailMessage_ID", c => c.Int());
            AddForeignKey("VMMailMessage", "ApplicantMailMessage_ID", "ApplicantMailMessage", "ID");
            CreateIndex("VMMailMessage", "ApplicantMailMessage_ID");
        }
        
        public override void Down()
        {
            DropIndex("VMMailMessage", new[] { "ApplicantMailMessage_ID" });
            DropIndex("ApplicantMailMessage", new[] { "ApplicantId" });
            DropForeignKey("VMMailMessage", "ApplicantMailMessage_ID", "ApplicantMailMessage");
            DropForeignKey("ApplicantMailMessage", "ApplicantId", "Applicant");
            DropColumn("VMMailMessage", "ApplicantMailMessage_ID");
            DropTable("ApplicantMailMessage");
        }
    }
}
