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
       * Данный метод вызывается после миграции до последней версии,
       * здесь можно реализовать добавление тестовых данных(т.е заполнить БД если необходимо)
       * */
    }
  }
}
