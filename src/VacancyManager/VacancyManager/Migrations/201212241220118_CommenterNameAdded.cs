namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class CommenterNameAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("Comment", "CommenterName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("Comment", "CommenterName");
        }
    }
}
