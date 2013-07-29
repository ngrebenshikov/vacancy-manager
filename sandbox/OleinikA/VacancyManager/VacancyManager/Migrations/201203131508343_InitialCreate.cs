namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "Consideration",
                c => new
                    {
                        ConsiderationID = c.Int(nullable: false, identity: true),
                        VacancyID = c.Int(nullable: false),
                        ApplicantID = c.Int(nullable: false),
                        User_UserID = c.Int(),
                    })
                .PrimaryKey(t => t.ConsiderationID)
                .ForeignKey("User", t => t.User_UserID)
                .ForeignKey("Vacancy", t => t.VacancyID, cascadeDelete: true)
                .Index(t => t.User_UserID)
                .Index(t => t.VacancyID);
            
            CreateTable(
                "User",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        UserName = c.String(maxLength: 4000),
                        Email = c.String(maxLength: 4000),
                        Password = c.String(maxLength: 4000),
                        PasswordSalt = c.String(maxLength: 4000),
                        UserComment = c.String(maxLength: 4000),
                        CreateDate = c.DateTime(nullable: false),
                        IsActivated = c.Boolean(nullable: false),
                        IsLockedOut = c.Boolean(nullable: false),
                        LastLockedOutDate = c.DateTime(nullable: false),
                        LastLockedOutReason = c.String(maxLength: 4000),
                        EmailKey = c.String(maxLength: 4000),
                        Role = c.String(maxLength: 4000),
                    })
                .PrimaryKey(t => t.UserID);
            
            CreateTable(
                "Comment",
                c => new
                    {
                        CommentID = c.Int(nullable: false, identity: true),
                        CreationDate = c.DateTime(nullable: false),
                        Body = c.String(maxLength: 4000),
                        User_UserID = c.Int(),
                        Consideration_ConsiderationID = c.Int(),
                    })
                .PrimaryKey(t => t.CommentID)
                .ForeignKey("User", t => t.User_UserID)
                .ForeignKey("Consideration", t => t.Consideration_ConsiderationID)
                .Index(t => t.User_UserID)
                .Index(t => t.Consideration_ConsiderationID);
            
            CreateTable(
                "Resume",
                c => new
                    {
                        ResumeID = c.Int(nullable: false, identity: true),
                        Position = c.String(maxLength: 4000),
                        Summary = c.String(maxLength: 4000),
                        ForeignLanguage = c.String(maxLength: 4000),
                        User_UserID = c.Int(),
                    })
                .PrimaryKey(t => t.ResumeID)
                .ForeignKey("User", t => t.User_UserID)
                .Index(t => t.User_UserID);
            
            CreateTable(
                "PreviousExperience",
                c => new
                    {
                        PreviousExperienceID = c.Int(nullable: false, identity: true),
                        Job = c.String(maxLength: 4000),
                        StartDate = c.DateTime(nullable: false),
                        FinishDate = c.DateTime(),
                        Position = c.String(maxLength: 4000),
                        Duties = c.String(maxLength: 4000),
                        Technology = c.String(maxLength: 4000),
                        User_UserID = c.Int(),
                        Resume_ResumeID = c.Int(),
                    })
                .PrimaryKey(t => t.PreviousExperienceID)
                .ForeignKey("User", t => t.User_UserID)
                .ForeignKey("Resume", t => t.Resume_ResumeID)
                .Index(t => t.User_UserID)
                .Index(t => t.Resume_ResumeID);
            
            CreateTable(
                "Education",
                c => new
                    {
                        EducationID = c.Int(nullable: false, identity: true),
                        Institute = c.String(maxLength: 4000),
                        Speciality = c.String(maxLength: 4000),
                        StartDate = c.DateTime(nullable: false),
                        FinishDate = c.DateTime(),
                        User_UserID = c.Int(),
                        Resume_ResumeID = c.Int(),
                    })
                .PrimaryKey(t => t.EducationID)
                .ForeignKey("User", t => t.User_UserID)
                .ForeignKey("Resume", t => t.Resume_ResumeID)
                .Index(t => t.User_UserID)
                .Index(t => t.Resume_ResumeID);
            
            CreateTable(
                "TechnologyStack",
                c => new
                    {
                        TechnologyStackID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 4000),
                        Resume_ResumeID = c.Int(),
                        Vacancy_VacancyID = c.Int(),
                    })
                .PrimaryKey(t => t.TechnologyStackID)
                .ForeignKey("Resume", t => t.Resume_ResumeID)
                .ForeignKey("Vacancy", t => t.Vacancy_VacancyID)
                .Index(t => t.Resume_ResumeID)
                .Index(t => t.Vacancy_VacancyID);
            
            CreateTable(
                "Technology",
                c => new
                    {
                        TechnologyID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 4000),
                        TechnologyStack_TechnologyStackID = c.Int(),
                    })
                .PrimaryKey(t => t.TechnologyID)
                .ForeignKey("TechnologyStack", t => t.TechnologyStack_TechnologyStackID)
                .Index(t => t.TechnologyStack_TechnologyStackID);
            
            CreateTable(
                "File",
                c => new
                    {
                        FileID = c.Int(nullable: false, identity: true),
                        User_UserID = c.Int(),
                    })
                .PrimaryKey(t => t.FileID)
                .ForeignKey("User", t => t.User_UserID)
                .Index(t => t.User_UserID);
            
            CreateTable(
                "Vacancy",
                c => new
                    {
                        VacancyID = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 4000),
                        Description = c.String(nullable: false, maxLength: 4000),
                        OpeningDate = c.DateTime(),
                        ForeignLanguage = c.String(maxLength: 4000),
                        Requirments = c.String(maxLength: 4000),
                        IsVisible = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.VacancyID);
            
        }
        
        public override void Down()
        {
            DropIndex("File", new[] { "User_UserID" });
            DropIndex("Technology", new[] { "TechnologyStack_TechnologyStackID" });
            DropIndex("TechnologyStack", new[] { "Vacancy_VacancyID" });
            DropIndex("TechnologyStack", new[] { "Resume_ResumeID" });
            DropIndex("Education", new[] { "Resume_ResumeID" });
            DropIndex("Education", new[] { "User_UserID" });
            DropIndex("PreviousExperience", new[] { "Resume_ResumeID" });
            DropIndex("PreviousExperience", new[] { "User_UserID" });
            DropIndex("Resume", new[] { "User_UserID" });
            DropIndex("Comment", new[] { "Consideration_ConsiderationID" });
            DropIndex("Comment", new[] { "User_UserID" });
            DropIndex("Consideration", new[] { "VacancyID" });
            DropIndex("Consideration", new[] { "User_UserID" });
            DropForeignKey("File", "User_UserID", "User");
            DropForeignKey("Technology", "TechnologyStack_TechnologyStackID", "TechnologyStack");
            DropForeignKey("TechnologyStack", "Vacancy_VacancyID", "Vacancy");
            DropForeignKey("TechnologyStack", "Resume_ResumeID", "Resume");
            DropForeignKey("Education", "Resume_ResumeID", "Resume");
            DropForeignKey("Education", "User_UserID", "User");
            DropForeignKey("PreviousExperience", "Resume_ResumeID", "Resume");
            DropForeignKey("PreviousExperience", "User_UserID", "User");
            DropForeignKey("Resume", "User_UserID", "User");
            DropForeignKey("Comment", "Consideration_ConsiderationID", "Consideration");
            DropForeignKey("Comment", "User_UserID", "User");
            DropForeignKey("Consideration", "VacancyID", "Vacancy");
            DropForeignKey("Consideration", "User_UserID", "User");
            DropTable("Vacancy");
            DropTable("File");
            DropTable("Technology");
            DropTable("TechnologyStack");
            DropTable("Education");
            DropTable("PreviousExperience");
            DropTable("Resume");
            DropTable("Comment");
            DropTable("User");
            DropTable("Consideration");
        }
    }
}
