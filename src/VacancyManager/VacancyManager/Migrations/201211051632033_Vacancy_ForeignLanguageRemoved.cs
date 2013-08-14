namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Vacancy_ForeignLanguageRemoved : DbMigration
    {
        public override void Up()
        {
            DropColumn("Vacancy", "ForeignLanguage");
        }
        
        public override void Down()
        {
            AddColumn("Vacancy", "ForeignLanguage", c => c.String());
        }
    }
}
