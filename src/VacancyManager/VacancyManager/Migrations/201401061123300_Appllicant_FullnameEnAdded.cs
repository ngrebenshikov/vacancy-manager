namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Appllicant_FullnameEnAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("Applicant", "FullNameEn", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("Applicant", "FullNameEn");
        }
    }
}
