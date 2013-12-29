namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantID_Added : DbMigration
    {
        public override void Up()
        {
            AddColumn("Comment", "ApplicantID", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("Comment", "ApplicantID");
        }
    }
}
