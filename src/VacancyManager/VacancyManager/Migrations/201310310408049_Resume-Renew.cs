namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ResumeRenew : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Resume", "User_UserID", "User");
            DropForeignKey("PreviousExperience", "User_UserID", "User");
            DropForeignKey("PreviousExperience", "Resume_ResumeID", "Resume");
            DropForeignKey("Education", "Resume_ResumeID", "Resume");
            DropForeignKey("RequirementResumeRecord", "Requirement_RequirementID", "Requirement");
            DropForeignKey("RequirementResumeRecord", "Resume_ResumeID", "Resume");
            DropIndex("Resume", new[] { "User_UserID" });
            DropIndex("PreviousExperience", new[] { "User_UserID" });
            DropIndex("PreviousExperience", new[] { "Resume_ResumeID" });
            DropIndex("Education", new[] { "Resume_ResumeID" });
            DropIndex("RequirementResumeRecord", new[] { "Requirement_RequirementID" });
            DropIndex("RequirementResumeRecord", new[] { "Resume_ResumeID" });
            CreateTable(
                "ResumeRequirement",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ResumeId = c.Int(nullable: false),
                        RequirementId = c.Int(nullable: false),
                        Comment = c.String(),
                        IsChecked = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("Resume", t => t.ResumeId, cascadeDelete: true)
                .Index(t => t.ResumeId);
            
            CreateTable(
                "Experience",
                c => new
                    {
                        ExperienceId = c.Int(nullable: false, identity: true),
                        Job = c.String(),
                        Project = c.String(),
                        Position = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        FinishDate = c.DateTime(),
                        Duties = c.String(),
                        IsEducation = c.Boolean(nullable: false),
                        Resume_ResumeId = c.Int(),
                    })
                .PrimaryKey(t => t.ExperienceId)
                .ForeignKey("Resume", t => t.Resume_ResumeId)
                .Index(t => t.Resume_ResumeId);
            
            CreateTable(
                "ExperienceRequirement",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ExperienceId = c.Int(nullable: false),
                        RequirementId = c.Int(nullable: false),
                        Comment = c.String(),
                        IsChecked = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("Experience", t => t.ExperienceId, cascadeDelete: true)
                .Index(t => t.ExperienceId);
            
            AddColumn("Resume", "Training", c => c.String());
            AddColumn("Resume", "AdditionalInformation", c => c.String());
            AlterColumn("Resume", "ResumeId", c => c.Int(nullable: false, identity: true));
            DropPrimaryKey("Resume", new[] { "ResumeID" });
            AddPrimaryKey("Resume", "ResumeId");
            DropColumn("Resume", "ForeignLanguage");
            DropColumn("Resume", "User_UserID");
            DropColumn("Education", "Resume_ResumeID");
            DropTable("PreviousExperience");
            DropTable("RequirementResumeRecord");
        }
        
        public override void Down()
        {
            CreateTable(
                "RequirementResumeRecord",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        Requirement_RequirementID = c.Int(),
                        Resume_ResumeID = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "PreviousExperience",
                c => new
                    {
                        PreviousExperienceID = c.Int(nullable: false, identity: true),
                        Job = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        FinishDate = c.DateTime(),
                        Position = c.String(),
                        Duties = c.String(),
                        Technologies = c.String(),
                        User_UserID = c.Int(),
                        Resume_ResumeID = c.Int(),
                    })
                .PrimaryKey(t => t.PreviousExperienceID);
            
            AddColumn("Education", "Resume_ResumeID", c => c.Int());
            AddColumn("Resume", "User_UserID", c => c.Int());
            AddColumn("Resume", "ForeignLanguage", c => c.String());
            DropIndex("ExperienceRequirement", new[] { "ExperienceId" });
            DropIndex("Experience", new[] { "Resume_ResumeId" });
            DropIndex("ResumeRequirement", new[] { "ResumeId" });
            DropForeignKey("ExperienceRequirement", "ExperienceId", "Experience");
            DropForeignKey("Experience", "Resume_ResumeId", "Resume");
            DropForeignKey("ResumeRequirement", "ResumeId", "Resume");
            DropPrimaryKey("Resume", new[] { "ResumeId" });
            AddPrimaryKey("Resume", "ResumeID");
            AlterColumn("Resume", "ResumeID", c => c.Int(nullable: false, identity: true));
            DropColumn("Resume", "AdditionalInformation");
            DropColumn("Resume", "Training");
            DropTable("ExperienceRequirement");
            DropTable("Experience");
            DropTable("ResumeRequirement");
            CreateIndex("RequirementResumeRecord", "Resume_ResumeID");
            CreateIndex("RequirementResumeRecord", "Requirement_RequirementID");
            CreateIndex("Education", "Resume_ResumeID");
            CreateIndex("PreviousExperience", "Resume_ResumeID");
            CreateIndex("PreviousExperience", "User_UserID");
            CreateIndex("Resume", "User_UserID");
            AddForeignKey("RequirementResumeRecord", "Resume_ResumeID", "Resume", "ResumeID");
            AddForeignKey("RequirementResumeRecord", "Requirement_RequirementID", "Requirement", "RequirementID");
            AddForeignKey("Education", "Resume_ResumeID", "Resume", "ResumeID");
            AddForeignKey("PreviousExperience", "Resume_ResumeID", "Resume", "ResumeID");
            AddForeignKey("PreviousExperience", "User_UserID", "User", "UserID");
            AddForeignKey("Resume", "User_UserID", "User", "UserID");
        }
    }
}
