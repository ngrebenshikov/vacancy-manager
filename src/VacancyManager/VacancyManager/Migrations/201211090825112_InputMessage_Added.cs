namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class InputMessage_Added : DbMigration
    {
        public override void Up()
        {
            AddForeignKey("InputMessage", "ConsiderationId", "Consideration", "ConsiderationID", cascadeDelete: true);
            CreateIndex("InputMessage", "ConsiderationId");
        }
        
        public override void Down()
        {
            DropIndex("InputMessage", new[] { "ConsiderationId" });
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
        }
    }
}
