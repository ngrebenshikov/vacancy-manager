namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class InputMessageRemoved : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
            DropForeignKey("Attachment", "InputMessage_Id", "InputMessage");
            DropIndex("InputMessage", new[] { "ConsiderationId" });
            DropIndex("Attachment", new[] { "InputMessage_Id" });
            AddColumn("ApplicantMailMessage", "VMMailMessage_Id1", c => c.Int());
            AddForeignKey("ApplicantMailMessage", "VMMailMessage_Id1", "VMMailMessage", "Id");
            CreateIndex("ApplicantMailMessage", "VMMailMessage_Id1");
            DropColumn("Attachment", "InputMessage_Id");
            DropTable("InputMessage");
        }
        
        public override void Down()
        {
            CreateTable(
                "InputMessage",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SendDate = c.DateTime(nullable: false),
                        DeliveryDate = c.DateTime(nullable: false),
                        Sender = c.String(),
                        Subject = c.String(),
                        Text = c.String(),
                        IsRead = c.Boolean(nullable: false),
                        ConsiderationId = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("Attachment", "InputMessage_Id", c => c.Int());
            DropIndex("ApplicantMailMessage", new[] { "VMMailMessage_Id1" });
            DropForeignKey("ApplicantMailMessage", "VMMailMessage_Id1", "VMMailMessage");
            DropColumn("ApplicantMailMessage", "VMMailMessage_Id1");
            CreateIndex("Attachment", "InputMessage_Id");
            CreateIndex("InputMessage", "ConsiderationId");
            AddForeignKey("Attachment", "InputMessage_Id", "InputMessage", "Id");
            AddForeignKey("InputMessage", "ConsiderationId", "Consideration", "ConsiderationID");
        }
    }
}
