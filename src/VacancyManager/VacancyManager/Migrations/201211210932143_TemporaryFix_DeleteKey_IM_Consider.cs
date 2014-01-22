namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class TemporaryFix_DeleteKey_IM_Consider : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
            DropIndex("InputMessage", new[] { "ConsiderationId" });
        }
        
        public override void Down()
        {
            CreateIndex("InputMessage", "ConsiderationId");
            AddForeignKey("InputMessage", "ConsiderationId", "Consideration", "ConsiderationID");
        }
    }
}
