namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class VMMailMessageAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "VMMailMessage",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SendDate = c.DateTime(nullable: false),
                        DeliveryDate = c.DateTime(nullable: false),
                        From = c.String(),
                        To = c.String(),
                        Subject = c.String(),
                        Text = c.String(),
                        IsRead = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("Attachment", "VMMailMessage_Id", c => c.Int());
            AddForeignKey("Attachment", "VMMailMessage_Id", "VMMailMessage", "Id");
            CreateIndex("Attachment", "VMMailMessage_Id");
        }
        
        public override void Down()
        {
            DropIndex("Attachment", new[] { "VMMailMessage_Id" });
            DropForeignKey("Attachment", "VMMailMessage_Id", "VMMailMessage");
            DropColumn("Attachment", "VMMailMessage_Id");
            DropTable("VMMailMessage");
        }
    }
}
