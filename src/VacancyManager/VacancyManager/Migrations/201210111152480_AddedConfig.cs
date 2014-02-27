namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class AddedConfig : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "SysConfig",
                c => new
                    {
                        Name = c.String(nullable: false, maxLength: 128),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.Name);
            
        }
        
        public override void Down()
        {
            DropTable("SysConfig");
        }
    }
}
