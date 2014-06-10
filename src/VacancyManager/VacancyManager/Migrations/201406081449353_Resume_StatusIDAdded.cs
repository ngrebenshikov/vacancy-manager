namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Resume_StatusIDAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("Resume", "StatusID", c => c.Int(nullable: false, defaultValue: 1));
        }
        
        public override void Down()
        {
            DropColumn("Resume", "StatusID");
        }
    }
}
