namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class AddedConfig : DbMigration
    {
        public override void Up()
        {
            AddColumn("SysConfig", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("SysConfig", "Name", c => c.String(nullable: false));
            AlterColumn("SysConfig", "Value", c => c.String(nullable: false));
            DropPrimaryKey("SysConfig", new[] { "Name" });
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
