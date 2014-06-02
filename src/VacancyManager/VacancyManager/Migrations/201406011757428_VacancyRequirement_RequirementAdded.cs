namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class VacancyRequirement_RequirementAdded : DbMigration
    {
        public override void Up()
        {
            AddForeignKey("VacancyRequirement", "RequirementID", "Requirement", "RequirementID", cascadeDelete: true);
            CreateIndex("VacancyRequirement", "RequirementID");
        }
        
        public override void Down()
        {
            DropIndex("VacancyRequirement", new[] { "RequirementID" });
            DropForeignKey("VacancyRequirement", "RequirementID", "Requirement");
        }
    }
}
