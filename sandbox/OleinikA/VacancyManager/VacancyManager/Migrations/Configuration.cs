namespace VacancyManager.Migrations
{
  using System;
  using System.Data.Entity;
  using System.Data.Entity.Migrations;
  using System.Linq;

  internal sealed class Configuration : DbMigrationsConfiguration<VacancyManager.Models.VacancyContext>
  {
    public Configuration()
    {
      AutomaticMigrationsEnabled = false;
    }

    protected override void Seed(VacancyManager.Models.VacancyContext context)
    {
      /*
       * ������ ����� ���������� ����� �������� �� ��������� ������,
       * ����� ����� ����������� ���������� �������� ������(�.� ��������� �� ���� ����������)
       * */
    }
  }
}
