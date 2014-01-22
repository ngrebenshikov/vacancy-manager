namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class MailMessageConsiderationId_Added : DbMigration
    {
        public override void Up()
        {
            AddColumn("VMMailMessage", "ConsiderationId", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("VMMailMessage", "ConsiderationId");
        }
    }
}
