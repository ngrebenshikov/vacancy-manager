namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class SysConfig_CongiGroupAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("SysConfig", "ConfigGroup", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("SysConfig", "ConfigGroup");
        }
    }
}
