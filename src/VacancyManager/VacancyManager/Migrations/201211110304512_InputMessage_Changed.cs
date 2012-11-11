namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class InputMessage_Changed : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
            DropIndex("InputMessage", new[] { "ConsiderationId" });
            AlterColumn("InputMessage", "ConsiderationId", c => c.Int());
            AddForeignKey("InputMessage", "ConsiderationId", "Consideration", "ConsiderationID");
            CreateIndex("InputMessage", "ConsiderationId");
        }
        
        public override void Down()
        {
            DropIndex("InputMessage", new[] { "ConsiderationId" });
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
            AlterColumn("InputMessage", "ConsiderationId", c => c.Int(nullable: false));
            CreateIndex("InputMessage", "ConsiderationId");
            AddForeignKey("InputMessage", "ConsiderationId", "Consideration", "ConsiderationID", cascadeDelete: true);
        }
    }
}
