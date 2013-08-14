namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class IvanChange : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Comment", "User_UserID", "User");
            DropForeignKey("Comment", "Consideration_ConsiderationID", "Consideration");
            DropForeignKey("Comment", "Applicant_ApplicantID", "Applicant");
            DropIndex("Comment", new[] { "User_UserID" });
            DropIndex("Comment", new[] { "Consideration_ConsiderationID" });
            DropIndex("Comment", new[] { "Applicant_ApplicantID" });
            RenameColumn(table: "Comment", name: "User_UserID", newName: "UserID");
            RenameColumn(table: "Comment", name: "Consideration_ConsiderationID", newName: "ConsiderationID");
            AddForeignKey("Comment", "UserID", "User", "UserID", cascadeDelete: true);
            AddForeignKey("Comment", "ConsiderationID", "Consideration", "ConsiderationID", cascadeDelete: true);
            CreateIndex("Comment", "UserID");
            CreateIndex("Comment", "ConsiderationID");
            DropColumn("Comment", "Applicant_ApplicantID");
        }
        
        public override void Down()
        {
            AddColumn("Comment", "Applicant_ApplicantID", c => c.Int());
            DropIndex("Comment", new[] { "ConsiderationID" });
            DropIndex("Comment", new[] { "UserID" });
            DropForeignKey("Comment", "ConsiderationID", "Consideration");
            DropForeignKey("Comment", "UserID", "User");
            RenameColumn(table: "Comment", name: "ConsiderationID", newName: "Consideration_ConsiderationID");
            RenameColumn(table: "Comment", name: "UserID", newName: "User_UserID");
            CreateIndex("Comment", "Applicant_ApplicantID");
            CreateIndex("Comment", "Consideration_ConsiderationID");
            CreateIndex("Comment", "User_UserID");
            AddForeignKey("Comment", "Applicant_ApplicantID", "Applicant", "ApplicantID");
            AddForeignKey("Comment", "Consideration_ConsiderationID", "Consideration", "ConsiderationID");
            AddForeignKey("Comment", "User_UserID", "User", "UserID");
        }
    }
}
