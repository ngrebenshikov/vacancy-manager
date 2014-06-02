namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ConsiderationStatus_Added : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "ConsiderationStatus",
                c => new
                    {
                        ConsiderationStatusID = c.Int(nullable: false, identity: true),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.ConsiderationStatusID);
            
            AddColumn("Consideration", "ConsiderationStatusID", c => c.Int(nullable: false));
            AddForeignKey("Consideration", "ConsiderationStatusID", "ConsiderationStatus", "ConsiderationStatusID", cascadeDelete: false);
            CreateIndex("Consideration", "ConsiderationStatusID");
        }
        
        public override void Down()
        {
            DropIndex("Consideration", new[] { "ConsiderationStatusID" });
            DropForeignKey("Consideration", "ConsiderationStatusID", "ConsiderationStatus");
            DropColumn("Consideration", "ConsiderationStatusID");
            DropTable("ConsiderationStatus");
        }
    }
}
