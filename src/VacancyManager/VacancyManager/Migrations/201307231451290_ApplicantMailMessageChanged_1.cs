namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class ApplicantMailMessageChanged_1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("VMMailMessage", "ApplicantMailMessage_ID", "ApplicantMailMessage");
            DropIndex("VMMailMessage", new[] { "ApplicantMailMessage_ID" });
            DropColumn("VMMailMessage", "ApplicantMailMessage_ID");
        }
        
        public override void Down()
        {
            AddColumn("VMMailMessage", "ApplicantMailMessage_ID", c => c.Int());
            CreateIndex("VMMailMessage", "ApplicantMailMessage_ID");
            AddForeignKey("VMMailMessage", "ApplicantMailMessage_ID", "ApplicantMailMessage", "ID");
        }
    }
}
