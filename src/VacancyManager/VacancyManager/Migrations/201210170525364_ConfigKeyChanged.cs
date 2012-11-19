namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ConfigKeyChanged : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("SysConfig", new[] { "Name" });
            AddColumn("SysConfig", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("SysConfig", "Name", c => c.String(nullable: false));
            AlterColumn("SysConfig", "Value", c => c.String(nullable: false));
            AddPrimaryKey("SysConfig", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("SysConfig", new[] { "Id" });
            AddPrimaryKey("SysConfig", "Name");
            AlterColumn("SysConfig", "Value", c => c.String());
            AlterColumn("SysConfig", "Name", c => c.String(nullable: false, maxLength: 128));
            DropColumn("SysConfig", "Id");
        }
    }
}
