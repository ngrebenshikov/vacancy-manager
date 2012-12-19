namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicatRequirementAdded_And_ApplicantFullNameField : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "ApplicantRequirement",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicantId = c.Int(nullable: false),
                        RequirementId = c.Int(nullable: false),
                        Comment = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("Applicant", t => t.ApplicantId, cascadeDelete: true)
                .Index(t => t.ApplicantId);
            
            AddColumn("Applicant", "FullName", c => c.String());
            DropColumn("Applicant", "FIO");
        }
        
        public override void Down()
        {
            AddColumn("Applicant", "FIO", c => c.String());
            DropIndex("ApplicantRequirement", new[] { "ApplicantId" });
            DropForeignKey("ApplicantRequirement", "ApplicantId", "Applicant");
            DropColumn("Applicant", "FullName");
            DropTable("ApplicantRequirement");
        }
    }
}
