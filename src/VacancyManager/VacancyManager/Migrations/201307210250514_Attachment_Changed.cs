namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Attachment_Changed : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("Attachment", "InputMessageId", "InputMessage");
            DropIndex("Attachment", new[] { "InputMessageId" });
            RenameColumn(table: "Attachment", name: "InputMessageId", newName: "InputMessage_Id");
            AddColumn("Attachment", "MessageId", c => c.Int(nullable: false));
            AddForeignKey("Attachment", "InputMessage_Id", "InputMessage", "Id");
            CreateIndex("Attachment", "InputMessage_Id");
        }
        
        public override void Down()
        {
            DropIndex("Attachment", new[] { "InputMessage_Id" });
            DropForeignKey("Attachment", "InputMessage_Id", "InputMessage");
            DropColumn("Attachment", "MessageId");
            RenameColumn(table: "Attachment", name: "InputMessage_Id", newName: "InputMessageId");
            CreateIndex("Attachment", "InputMessageId");
            AddForeignKey("Attachment", "InputMessageId", "InputMessage", "Id", cascadeDelete: true);
        }
    }
}
