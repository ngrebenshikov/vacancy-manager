namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class VacancyRequirement_IsRequireAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("VacancyRequirement", "IsRequire", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("VacancyRequirement", "IsRequire");
        }
    }
}
