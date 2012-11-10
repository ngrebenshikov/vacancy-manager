namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantRequirements_Added_IsChecked : DbMigration
    {
        public override void Up()
        {
            AddColumn("ApplicantRequirement", "IsChecked", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("ApplicantRequirement", "IsChecked");
        }
    }
}
