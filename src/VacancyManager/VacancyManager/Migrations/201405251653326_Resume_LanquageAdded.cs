namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Resume_LanquageAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("Resume", "Lanquage", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("Resume", "Lanquage");
        }
    }
}
