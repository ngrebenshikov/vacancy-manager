namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Fixed_again : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Consideration", "Consideration_ConsiderationID", "Consideration");
            DropIndex("Consideration", new[] { "Consideration_ConsiderationID" });
            AddForeignKey("InputMessage", "ConsiderationId", "Consideration", "ConsiderationID");
            CreateIndex("InputMessage", "ConsiderationId");
            DropColumn("Consideration", "Consideration_ConsiderationID");
        }
        
        public override void Down()
        {
            AddColumn("Consideration", "Consideration_ConsiderationID", c => c.Int());
            DropIndex("InputMessage", new[] { "ConsiderationId" });
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
            CreateIndex("Consideration", "Consideration_ConsiderationID");
            AddForeignKey("Consideration", "Consideration_ConsiderationID", "Consideration", "ConsiderationID");
        }
    }
}
