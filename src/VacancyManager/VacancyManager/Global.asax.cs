﻿using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Ninject;
using Ninject.Web.Mvc;
using VacancyManager.Models.DAL;
using VacancyManager.Services;

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

        private void SetupDependencyInjection()
        {
            // Create Ninject DI kernel
            IKernel kernel = new StandardKernel();

            // Register services with Ninject DI Container
            kernel.Bind<IRepository>().To<StandardRepository>();

            // Tell ASP.NET MVC 3 to use our Ninject DI Container
            DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));
        }


        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Имя маршрута
                "{controller}/{action}/{id}", // URL-адрес с параметрами
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Параметры по умолчанию
            );

        }

        protected void Application_Start()
        {
            SetupDependencyInjection();

            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            Database.SetInitializer(new VacancyInitializer());
        }
    }
}