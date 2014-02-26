namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class NewInputMessage : DbMigration
    {
        public override void Up()
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("Consideration", t => t.ConsiderationId)
                .Index(t => t.ConsiderationId);

            CreateTable(
               "Attachment",
               c => new
               {
                   Id = c.Int(nullable: false, identity: true),
                   FileGuid = c.Guid(nullable: false),
                   FileName = c.String(),
                   ContentType = c.String(),
                   FileContent = c.Binary(),
                   InputMessageId = c.Int(nullable: false),
               })
               .PrimaryKey(t => t.Id)
               .ForeignKey("InputMessage", t => t.InputMessageId, cascadeDelete: true)
               .Index(t => t.InputMessageId);
            
        }
        
        public override void Down()
        {
            DropIndex("InputMessage", new[] { "ConsiderationId" });
            DropIndex("Attachment", new[] { "InputMessageId" });
            DropForeignKey("InputMessage", "ConsiderationId", "Consideration");
            DropForeignKey("Attachment", "InputMessageId", "InputMessage");
            DropTable("InputMessage");
            DropTable("Attachment");
        }
    }
}
