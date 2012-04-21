using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using Ninject;
using System.Reflection;
using Ninject.Web.Mvc;
using VacancyManager.Models.DAL;
using VacancyManager.Services;

namespace VacancyManager
{
  // Примечание: Инструкции по включению классического режима IIS6 или IIS7 
  // см. по ссылке http://go.microsoft.com/?LinkId=9394801

  public class MvcApplication : NinjectHttpApplication
  {

    public static void RegisterGlobalFilters(GlobalFilterCollection filters)
    {
      filters.Add(new HandleErrorAttribute());
    }

    public static void RegisterRoutes(RouteCollection routes)
    {
      routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

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

    protected override IKernel CreateKernel()
    {
      // Create Ninject DI kernel
      IKernel kernel = new StandardKernel();

      // Register services with Ninject DI Container
      kernel.Bind<IRepository>().To<StandardRepository>();
      kernel.Inject(Membership.Provider);
      kernel.Inject(Roles.Provider);

      // Tell ASP.NET MVC 3 to use our Ninject DI Container
      DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));
      return kernel;
    }

    protected override void OnApplicationStarted()
    {
      base.OnApplicationStarted();
      AreaRegistration.RegisterAllAreas();
      RegisterGlobalFilters(GlobalFilters.Filters);
      RegisterRoutes(RouteTable.Routes);
    }
  }
}