namespace VacancyManager.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Attachment_Added : DbMigration
    {
        public override void Up()
        {
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
            DropIndex("Attachment", new[] { "InputMessageId" });
            DropForeignKey("Attachment", "InputMessageId", "InputMessage");
            DropTable("Attachment");
        }
    }
}
