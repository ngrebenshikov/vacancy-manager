namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class VacancyRequirementsAdded : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("RequirementStack", "Vacancy_VacancyID", "Vacancy");
            DropIndex("RequirementStack", new[] { "Vacancy_VacancyID" });
            CreateTable(
                "VacancyRequirement",
                c => new
                    {
                        VacancyRequirementID = c.Int(nullable: false, identity: true),
                        VacancyID = c.Int(nullable: false),
                        RequirementID = c.Int(nullable: false),
                        Comments = c.String(),
                    })
                .PrimaryKey(t => t.VacancyRequirementID)
                .ForeignKey("Vacancy", t => t.VacancyID, cascadeDelete: true)
                .Index(t => t.VacancyID);
            
            DropColumn("RequirementStack", "Vacancy_VacancyID");
        }
        
        public override void Down()
        {
            AddColumn("RequirementStack", "Vacancy_VacancyID", c => c.Int());
            DropIndex("VacancyRequirement", new[] { "VacancyID" });
            DropForeignKey("VacancyRequirement", "VacancyID", "Vacancy");
            DropTable("VacancyRequirement");
            CreateIndex("RequirementStack", "Vacancy_VacancyID");
            AddForeignKey("RequirementStack", "Vacancy_VacancyID", "Vacancy", "VacancyID");
        }
    }
}
