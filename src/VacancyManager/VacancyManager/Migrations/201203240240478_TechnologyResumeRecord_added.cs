namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class TechnologyResumeRecord_added : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("TechnologyStack", "Resume_ResumeID", "Resume");
            DropIndex("TechnologyStack", new[] { "Resume_ResumeID" });
            CreateTable(
                "TechnologyResumeRecord",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        Technology_TechnologyID = c.Int(),
                        Resume_ResumeID = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("Technology", t => t.Technology_TechnologyID)
                .ForeignKey("Resume", t => t.Resume_ResumeID)
                .Index(t => t.Technology_TechnologyID)
                .Index(t => t.Resume_ResumeID);
            
            AlterColumn("User", "UserName", c => c.String());
            AlterColumn("User", "Email", c => c.String());
            AlterColumn("User", "Password", c => c.String());
            AlterColumn("User", "PasswordSalt", c => c.String());
            AlterColumn("User", "UserComment", c => c.String());
            AlterColumn("User", "LastLockedOutReason", c => c.String());
            AlterColumn("User", "EmailKey", c => c.String());
            AlterColumn("Role", "Name", c => c.String());
            AlterColumn("Comment", "Body", c => c.String());
            AlterColumn("Resume", "Position", c => c.String());
            AlterColumn("Resume", "Summary", c => c.String());
            AlterColumn("Resume", "ForeignLanguage", c => c.String());
            AlterColumn("PreviousExperience", "Job", c => c.String());
            AlterColumn("PreviousExperience", "Position", c => c.String());
            AlterColumn("PreviousExperience", "Duties", c => c.String());
            AlterColumn("PreviousExperience", "Technology", c => c.String());
            AlterColumn("Education", "Institute", c => c.String());
            AlterColumn("Education", "Speciality", c => c.String());
            AlterColumn("TechnologyStack", "Name", c => c.String(nullable: false));
            AlterColumn("Technology", "Name", c => c.String(nullable: false));
            AlterColumn("Vacancy", "Title", c => c.String(nullable: false));
            AlterColumn("Vacancy", "Description", c => c.String(nullable: false));
            AlterColumn("Vacancy", "ForeignLanguage", c => c.String());
            AlterColumn("Vacancy", "Requirments", c => c.String());
            DropColumn("TechnologyStack", "Resume_ResumeID");
        }
        
        public override void Down()
        {
            AddColumn("TechnologyStack", "Resume_ResumeID", c => c.Int());
            DropIndex("TechnologyResumeRecord", new[] { "Resume_ResumeID" });
            DropIndex("TechnologyResumeRecord", new[] { "Technology_TechnologyID" });
            DropForeignKey("TechnologyResumeRecord", "Resume_ResumeID", "Resume");
            DropForeignKey("TechnologyResumeRecord", "Technology_TechnologyID", "Technology");
            AlterColumn("Vacancy", "Requirments", c => c.String(maxLength: 4000));
            AlterColumn("Vacancy", "ForeignLanguage", c => c.String(maxLength: 4000));
            AlterColumn("Vacancy", "Description", c => c.String(nullable: false, maxLength: 4000));
            AlterColumn("Vacancy", "Title", c => c.String(nullable: false, maxLength: 4000));
            AlterColumn("Technology", "Name", c => c.String(nullable: false, maxLength: 4000));
            AlterColumn("TechnologyStack", "Name", c => c.String(nullable: false, maxLength: 4000));
            AlterColumn("Education", "Speciality", c => c.String(maxLength: 4000));
            AlterColumn("Education", "Institute", c => c.String(maxLength: 4000));
            AlterColumn("PreviousExperience", "Technology", c => c.String(maxLength: 4000));
            AlterColumn("PreviousExperience", "Duties", c => c.String(maxLength: 4000));
            AlterColumn("PreviousExperience", "Position", c => c.String(maxLength: 4000));
            AlterColumn("PreviousExperience", "Job", c => c.String(maxLength: 4000));
            AlterColumn("Resume", "ForeignLanguage", c => c.String(maxLength: 4000));
            AlterColumn("Resume", "Summary", c => c.String(maxLength: 4000));
            AlterColumn("Resume", "Position", c => c.String(maxLength: 4000));
            AlterColumn("Comment", "Body", c => c.String(maxLength: 4000));
            AlterColumn("Role", "Name", c => c.String(maxLength: 4000));
            AlterColumn("User", "EmailKey", c => c.String(maxLength: 4000));
            AlterColumn("User", "LastLockedOutReason", c => c.String(maxLength: 4000));
            AlterColumn("User", "UserComment", c => c.String(maxLength: 4000));
            AlterColumn("User", "PasswordSalt", c => c.String(maxLength: 4000));
            AlterColumn("User", "Password", c => c.String(maxLength: 4000));
            AlterColumn("User", "Email", c => c.String(maxLength: 4000));
            AlterColumn("User", "UserName", c => c.String(maxLength: 4000));
            DropTable("TechnologyResumeRecord");
            CreateIndex("TechnologyStack", "Resume_ResumeID");
            AddForeignKey("TechnologyStack", "Resume_ResumeID", "Resume", "ResumeID");
        }
    }
}
