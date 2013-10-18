namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Fixed_consider_message_keys : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
            DropIndex("InputMessage", new[] { "ConsiderationId" });
            AddColumn("Consideration", "Consideration_ConsiderationID", c => c.Int());
            AddForeignKey("Consideration", "Consideration_ConsiderationID", "Consideration", "ConsiderationID");
            CreateIndex("Consideration", "Consideration_ConsiderationID");
        }
        
        public override void Down()
        {
            DropIndex("Consideration", new[] { "Consideration_ConsiderationID" });
            DropForeignKey("Consideration", "Consideration_ConsiderationID", "Consideration");
            DropColumn("Consideration", "Consideration_ConsiderationID");
            CreateIndex("InputMessage", "ConsiderationId");
            AddForeignKey("InputMessage", "ConsiderationId", "Consideration", "ConsiderationID");
        }
    }
}
