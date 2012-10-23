namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class User_LastLoginDateCorrected : DbMigration
    {
        public override void Up()
        {
            AddColumn("User", "LastLoginDate", c => c.DateTime(nullable: true));
            DropColumn("User", "LaslLoginDate");
        }
        
        public override void Down()
        {
            AddColumn("User", "LaslLoginDate", c => c.DateTime(nullable: true));
            DropColumn("User", "LastLoginDate");
        }
    }
}
