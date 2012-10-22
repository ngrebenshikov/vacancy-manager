using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManger;

namespace VacancyManager
{
  // Примечание: Инструкции по включению классического режима IIS6 или IIS7 
  // см. по ссылке http://go.microsoft.com/?LinkId=9394801

  public class MvcApplication : HttpApplication
  {

    public static void RegisterGlobalFilters(GlobalFilterCollection filters)
    {
      filters.Add(new HandleErrorAttribute());
    }

    public static void RegisterRoutes(RouteCollection routes)
    {
      //routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

      routes.MapRoute(
          "Default", // Route name
          "{controller}/{action}/{id}", // URL with parameters
          new
          {
            controller = "Home",
            action = "Index",
            id = UrlParameter.Optional
          });

      routes.MapRoute(
        "Activate",
        "Account/Activate/{username}/{key}",
        new
        {
          controller = "Account",
          action = "Activate",
          username = UrlParameter.Optional,
          key = UrlParameter.Optional
        });
    }

    protected void Application_Start()
    {
      AreaRegistration.RegisterAllAreas();
      RegisterGlobalFilters(GlobalFilters.Filters);
      RegisterRoutes(RouteTable.Routes);

      //Проверка есть ли админ
      VMMembershipUser user = (VMMembershipUser)Membership.GetUser("admin", false);
      if (user == null)
      {
        if (!SharedCode.CreateNewUser("admin", "StudVacancyProject@mail.ru", "admin", true, true).Item1)
          throw new System.Exception("Huston, we have a problems");
      }

    }
  }
}