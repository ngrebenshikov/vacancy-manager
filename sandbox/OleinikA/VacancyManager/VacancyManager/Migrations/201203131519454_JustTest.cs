namespace VacancyManager.Migrations
{
  using System.Data.Entity.Migrations;

  public partial class JustTest : DbMigration
  {
    public override void Up()
    {
      AddColumn("User", "MigrationTest", x => x.String(nullable: false, defaultValue: "JustTest"));
    }

    #region Описание
    /* Вызовется когда мы будем обновляться до версии ниже чем JustTest
     * Т.к JustTest единственная миграция, вернуться к начальной базе можно двумя способами:
     * Создать ещё миграцию в которой Up метод будет делать DropColumn("User", "MigrationTest");
     * Либо создать скрипт(или просто выполнить без скрипта)
     * update-database -script –SourceMigration:$InitialDatabase
     */
    #endregion
    public override void Down()
    {
      DropColumn("User", "MigrationTest");
    }
  }
}
