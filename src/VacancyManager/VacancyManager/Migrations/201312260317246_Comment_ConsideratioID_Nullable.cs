namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Comment_ConsideratioID_Nullable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Comment", "ConsiderationID", "Consideration");
            DropIndex("Comment", new[] { "ConsiderationID" });
            AlterColumn("Comment", "ConsiderationID", c => c.Int());
            AddForeignKey("Comment", "ConsiderationID", "Consideration", "ConsiderationID", cascadeDelete: true);
            CreateIndex("Comment", "ConsiderationID");
        }
        
        public override void Down()
        {
            DropIndex("Comment", new[] { "ConsiderationID" });
            DropForeignKey("Comment", "ConsiderationID", "Consideration");
            AlterColumn("Comment", "ConsiderationID", c => c.Int(nullable: false));
            CreateIndex("Comment", "ConsiderationID");
            AddForeignKey("Comment", "ConsiderationID", "Consideration", "ConsiderationID", cascadeDelete: true);
        }
    }
}
