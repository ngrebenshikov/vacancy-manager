using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using VacancyManager.Models;

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
        //Дальше идёт copy paste из методов легального созданию пользователя из админки
        MembershipCreateStatus createStatus;
        user = (VMMembershipUser)Membership.CreateUser("admin", "admin", "StudVacancyProject@mail.ru", null, null, true, null, out createStatus);
        if (createStatus != MembershipCreateStatus.Success)
          throw new System.Exception("Huston, we have a problems");

        user.UnlockUser();
        user.EmailKey = null;
        Membership.UpdateUser(user);

        if (!Roles.RoleExists("Admin"))
          Roles.CreateRole("Admin");
        Roles.AddUsersToRoles(new[] { "admin" }, new[] { "Admin" });
      }

    }
  }
}