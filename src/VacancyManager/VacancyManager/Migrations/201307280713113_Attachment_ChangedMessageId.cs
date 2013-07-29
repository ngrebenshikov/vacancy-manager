namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Attachment_ChangedMessageId : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Attachment", "VMMailMessage_Id", "VMMailMessage");
            DropIndex("Attachment", new[] { "VMMailMessage_Id" });
            RenameColumn(table: "Attachment", name: "VMMailMessage_Id", newName: "VMMailMessageId");
            AddForeignKey("Attachment", "VMMailMessageId", "VMMailMessage", "Id", cascadeDelete: true);
            CreateIndex("Attachment", "VMMailMessageId");
            DropColumn("Attachment", "MessageId");
        }
        
        public override void Down()
        {
            AddColumn("Attachment", "MessageId", c => c.Int(nullable: false));
            DropIndex("Attachment", new[] { "VMMailMessageId" });
            DropForeignKey("Attachment", "VMMailMessageId", "VMMailMessage");
            RenameColumn(table: "Attachment", name: "VMMailMessageId", newName: "VMMailMessage_Id");
            CreateIndex("Attachment", "VMMailMessage_Id");
            AddForeignKey("Attachment", "VMMailMessage_Id", "VMMailMessage", "Id");
        }
    }
}
