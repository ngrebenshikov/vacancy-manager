namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class TechnologyStackIDAddedToTechnology : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Technology", "TechnologyStack_TechnologyStackID", "TechnologyStack");
            DropIndex("Technology", new[] { "TechnologyStack_TechnologyStackID" });
            RenameColumn(table: "Technology", name: "TechnologyStack_TechnologyStackID", newName: "TechnologyStackID");
            AddColumn("PreviousExperience", "Technologies", c => c.String());
            AddForeignKey("Technology", "TechnologyStackID", "TechnologyStack", "TechnologyStackID", cascadeDelete: true);
            CreateIndex("Technology", "TechnologyStackID");
            DropColumn("PreviousExperience", "Technology");
        }
        
        public override void Down()
        {
            AddColumn("PreviousExperience", "Technology", c => c.String());
            DropIndex("Technology", new[] { "TechnologyStackID" });
            DropForeignKey("Technology", "TechnologyStackID", "TechnologyStack");
            DropColumn("PreviousExperience", "Technologies");
            RenameColumn(table: "Technology", name: "TechnologyStackID", newName: "TechnologyStack_TechnologyStackID");
            CreateIndex("Technology", "TechnologyStack_TechnologyStackID");
            AddForeignKey("Technology", "TechnologyStack_TechnologyStackID", "TechnologyStack", "TechnologyStackID");
        }
    }
}
