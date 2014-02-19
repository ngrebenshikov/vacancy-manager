namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class RenameTechToRequirement : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("TechnologyResumeRecord", "Technology_TechnologyID", "Technology");
            DropForeignKey("TechnologyResumeRecord", "Resume_ResumeID", "Resume");
            DropForeignKey("Technology", "TechnologyStackID", "TechnologyStack");
            DropForeignKey("TechnologyStack", "Vacancy_VacancyID", "Vacancy");
            DropIndex("TechnologyResumeRecord", new[] { "Technology_TechnologyID" });
            DropIndex("TechnologyResumeRecord", new[] { "Resume_ResumeID" });
            DropIndex("Technology", new[] { "TechnologyStackID" });
            DropIndex("TechnologyStack", new[] { "Vacancy_VacancyID" });
            CreateTable(
                "RequirementResumeRecord",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        Requirement_RequirementID = c.Int(),
                        Resume_ResumeID = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("Requirement", t => t.Requirement_RequirementID)
                .ForeignKey("Resume", t => t.Resume_ResumeID)
                .Index(t => t.Requirement_RequirementID)
                .Index(t => t.Resume_ResumeID);
            
            CreateTable(
                "Requirement",
                c => new
                    {
                        RequirementID = c.Int(nullable: false, identity: true),
                        RequirementStackID = c.Int(nullable: false),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.RequirementID)
                .ForeignKey("RequirementStack", t => t.RequirementStackID, cascadeDelete: true)
                .Index(t => t.RequirementStackID);
            
            CreateTable(
                "RequirementStack",
                c => new
                    {
                        RequirementStackID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Vacancy_VacancyID = c.Int(),
                    })
                .PrimaryKey(t => t.RequirementStackID)
                .ForeignKey("Vacancy", t => t.Vacancy_VacancyID)
                .Index(t => t.Vacancy_VacancyID);
            
            DropTable("TechnologyResumeRecord");
            DropTable("Technology");
            DropTable("TechnologyStack");
        }
        
        public override void Down()
        {
            CreateTable(
                "TechnologyStack",
                c => new
                    {
                        TechnologyStackID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Vacancy_VacancyID = c.Int(),
                    })
                .PrimaryKey(t => t.TechnologyStackID);
            
            CreateTable(
                "Technology",
                c => new
                    {
                        TechnologyID = c.Int(nullable: false, identity: true),
                        TechnologyStackID = c.Int(nullable: false),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.TechnologyID);
            
            CreateTable(
                "TechnologyResumeRecord",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        Technology_TechnologyID = c.Int(),
                        Resume_ResumeID = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropIndex("RequirementStack", new[] { "Vacancy_VacancyID" });
            DropIndex("Requirement", new[] { "RequirementStackID" });
            DropIndex("RequirementResumeRecord", new[] { "Resume_ResumeID" });
            DropIndex("RequirementResumeRecord", new[] { "Requirement_RequirementID" });
            DropForeignKey("RequirementStack", "Vacancy_VacancyID", "Vacancy");
            DropForeignKey("Requirement", "RequirementStackID", "RequirementStack");
            DropForeignKey("RequirementResumeRecord", "Resume_ResumeID", "Resume");
            DropForeignKey("RequirementResumeRecord", "Requirement_RequirementID", "Requirement");
            DropTable("RequirementStack");
            DropTable("Requirement");
            DropTable("RequirementResumeRecord");
            CreateIndex("TechnologyStack", "Vacancy_VacancyID");
            CreateIndex("Technology", "TechnologyStackID");
            CreateIndex("TechnologyResumeRecord", "Resume_ResumeID");
            CreateIndex("TechnologyResumeRecord", "Technology_TechnologyID");
            AddForeignKey("TechnologyStack", "Vacancy_VacancyID", "Vacancy", "VacancyID");
            AddForeignKey("Technology", "TechnologyStackID", "TechnologyStack", "TechnologyStackID", cascadeDelete: true);
            AddForeignKey("TechnologyResumeRecord", "Resume_ResumeID", "Resume", "ResumeID");
            AddForeignKey("TechnologyResumeRecord", "Technology_TechnologyID", "Technology", "TechnologyID");
        }
    }
}
