namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Consideration_UserChangedToApplicant : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Consideration", "User_UserID", "User");
            DropIndex("Consideration", new[] { "User_UserID" });
            DropColumn("Consideration", "User_UserID");
        }
        
        public override void Down()
        {
            AddColumn("Consideration", "User_UserID", c => c.Int());
            CreateIndex("Consideration", "User_UserID");
            AddForeignKey("Consideration", "User_UserID", "User", "UserID");
        }
    }
}
