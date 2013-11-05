namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantMailMessage_Changed : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("ApplicantMailMessage", "VMMailMessage_Id1", "VMMailMessage");
            DropIndex("ApplicantMailMessage", new[] { "VMMailMessage_Id1" });
            AddColumn("ApplicantMailMessage", "VMMailMessageId", c => c.Int(nullable: false));
            DropColumn("ApplicantMailMessage", "VMMailMessage_Id");
            DropColumn("ApplicantMailMessage", "VMMailMessage_Id1");
        }
        
        public override void Down()
        {
            AddColumn("ApplicantMailMessage", "VMMailMessage_Id1", c => c.Int());
            AddColumn("ApplicantMailMessage", "VMMailMessage_Id", c => c.Int(nullable: false));
            DropColumn("ApplicantMailMessage", "VMMailMessageId");
            CreateIndex("ApplicantMailMessage", "VMMailMessage_Id1");
            AddForeignKey("ApplicantMailMessage", "VMMailMessage_Id1", "VMMailMessage", "Id");
        }
    }
}
