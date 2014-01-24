namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Requirements_NameEnAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("RequirementStack", "NameEn", c => c.String());
            AddColumn("Requirement", "NameEn", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("Requirement", "NameEn");
            DropColumn("RequirementStack", "NameEn");
        }
    }
}
