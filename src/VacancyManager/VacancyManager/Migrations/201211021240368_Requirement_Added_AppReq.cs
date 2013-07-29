namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Requirement_Added_AppReq : DbMigration
    {
        public override void Up()
        {
            AddForeignKey("ApplicantRequirement", "RequirementId", "Requirement", "RequirementID", cascadeDelete: true);
            CreateIndex("ApplicantRequirement", "RequirementId");
        }
        
        public override void Down()
        {
            DropIndex("ApplicantRequirement", new[] { "RequirementId" });
            DropForeignKey("ApplicantRequirement", "RequirementId", "Requirement");
        }
    }
}
