namespace VacancyManager.Migrations
{
  using System.Data.Entity.Migrations;

  public partial class JustTest : DbMigration
  {
    public override void Up()
    {
      AddColumn("User", "MigrationTest", x => x.String(nullable: false, defaultValue: "JustTest"));
    }

    #region ��������
    /* ��������� ����� �� ����� ����������� �� ������ ���� ��� JustTest
     * �.� JustTest ������������ ��������, ��������� � ��������� ���� ����� ����� ���������:
     * ������� ��� �������� � ������� Up ����� ����� ������ DropColumn("User", "MigrationTest");
     * ���� ������� ������(��� ������ ��������� ��� �������)
     * update-database -script �SourceMigration:$InitialDatabase
     */
    #endregion
    public override void Down()
    {
      DropColumn("User", "MigrationTest");
    }
  }
}
