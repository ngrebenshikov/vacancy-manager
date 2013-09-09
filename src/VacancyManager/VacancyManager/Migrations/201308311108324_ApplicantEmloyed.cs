namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantEmloyed : DbMigration
    {
        public override void Up()
        {
            AddColumn("Applicant", "Employed", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("Applicant", "Employed");
        }
    }
}
