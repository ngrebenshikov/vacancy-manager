namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class MultiRole : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Role", "User_UserID", "User");
            DropIndex("Role", new[] { "User_UserID" });
            CreateTable(
                "RoleUser",
                c => new
                    {
                        Role_RoleID = c.Int(nullable: false),
                        User_UserID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Role_RoleID, t.User_UserID })
                .ForeignKey("Role", t => t.Role_RoleID, cascadeDelete: true)
                .ForeignKey("User", t => t.User_UserID, cascadeDelete: true)
                .Index(t => t.Role_RoleID)
                .Index(t => t.User_UserID);
            
            DropColumn("Role", "User_UserID");
        }
        
        public override void Down()
        {
            AddColumn("Role", "User_UserID", c => c.Int());
            DropIndex("RoleUser", new[] { "User_UserID" });
            DropIndex("RoleUser", new[] { "Role_RoleID" });
            DropForeignKey("RoleUser", "User_UserID", "User");
            DropForeignKey("RoleUser", "Role_RoleID", "Role");
            DropTable("RoleUser");
            CreateIndex("Role", "User_UserID");
            AddForeignKey("Role", "User_UserID", "User", "UserID");
        }
    }
}
