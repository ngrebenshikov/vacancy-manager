namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class TemporaryFix_AddedKey_IM_Consider : DbMigration
    {
        public override void Up()
        {
            AddForeignKey("InputMessage", "ConsiderationId", "Consideration", "ConsiderationID");
            CreateIndex("InputMessage", "ConsiderationId");
        }
        
        public override void Down()
        {
            DropIndex("InputMessage", new[] { "ConsiderationId" });
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
        }
    }
}
