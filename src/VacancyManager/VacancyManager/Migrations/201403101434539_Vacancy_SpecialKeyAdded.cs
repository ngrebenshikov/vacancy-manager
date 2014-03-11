namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Vacancy_SpecialKeyAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("Vacancy", "SpecialKey", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("Vacancy", "SpecialKey");
        }
    }
}
