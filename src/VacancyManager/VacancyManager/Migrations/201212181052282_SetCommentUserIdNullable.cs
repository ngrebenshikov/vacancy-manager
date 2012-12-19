namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class SetCommentUserIdNullable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Comment", "UserID", "User");
            DropIndex("Comment", new[] { "UserID" });
            AlterColumn("Comment", "UserID", c => c.Int());
            AddForeignKey("Comment", "UserID", "User", "UserID");
            CreateIndex("Comment", "UserID");
        }
        
        public override void Down()
        {
            DropIndex("Comment", new[] { "UserID" });
            DropForeignKey("Comment", "UserID", "User");
            AlterColumn("Comment", "UserID", c => c.Int(nullable: false));
            CreateIndex("Comment", "UserID");
            AddForeignKey("Comment", "UserID", "User", "UserID", cascadeDelete: true);
        }
    }
}
