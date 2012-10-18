namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class DropJustTest : DbMigration
    {
        public override void Up()
        {
          DropColumn("User", "MigrationTest");
        }
        
        public override void Down()
        {
          AddColumn("User", "MigrationTest", x => x.String(nullable: false, defaultValue: "JustTest"));
        }
    }
}
