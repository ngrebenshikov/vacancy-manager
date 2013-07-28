namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class VMMailMessage_MessageCategoryAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("VMMailMessage", "MessageCategory", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("VMMailMessage", "MessageCategory");
        }
    }
}
