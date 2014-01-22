namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Experience_ResumeIdAdded : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Experience", "Resume_ResumeId", "Resume");
            DropIndex("Experience", new[] { "Resume_ResumeId" });
            RenameColumn(table: "Experience", name: "Resume_ResumeId", newName: "ResumeId");
            AddForeignKey("Experience", "ResumeId", "Resume", "ResumeId", cascadeDelete: true);
            CreateIndex("Experience", "ResumeId");
        }
        
        public override void Down()
        {
            DropIndex("Experience", new[] { "ResumeId" });
            DropForeignKey("Experience", "ResumeId", "Resume");
            RenameColumn(table: "Experience", name: "ResumeId", newName: "Resume_ResumeId");
            CreateIndex("Experience", "Resume_ResumeId");
            AddForeignKey("Experience", "Resume_ResumeId", "Resume", "ResumeId");
        }
    }
}
