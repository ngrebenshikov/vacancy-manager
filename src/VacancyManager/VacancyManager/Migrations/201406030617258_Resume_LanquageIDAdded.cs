namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Resume_LanquageIDAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("Resume", "LanquageID", c => c.Int(nullable: false));
            DropColumn("Resume", "Lanquage");
        }
        
        public override void Down()
        {
            AddColumn("Resume", "Lanquage", c => c.Int(nullable: false));
            DropColumn("Resume", "LanquageID");
        }
    }
}
