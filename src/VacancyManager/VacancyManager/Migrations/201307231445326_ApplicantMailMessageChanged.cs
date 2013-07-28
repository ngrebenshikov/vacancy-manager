namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantMailMessageChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("ApplicantMailMessage", "VMMailMessage_Id", c => c.Int(nullable: false));
            DropColumn("ApplicantMailMessage", "MailMessageID");
        }
        
        public override void Down()
        {
            AddColumn("ApplicantMailMessage", "MailMessageID", c => c.Int(nullable: false));
            DropColumn("ApplicantMailMessage", "VMMailMessage_Id");
        }
    }
}
