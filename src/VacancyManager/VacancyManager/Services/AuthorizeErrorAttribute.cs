using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Helpers;
using Ninject;

namespace VacancyManager.Services
{
  // Сводка:
  //     Представляет атрибут, используемый вызывающими сторонами для ограничения
  //     доступа к методу действия.
  [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
  public class AuthorizeErrorAttribute : AuthorizeAttribute
  {
    // Сводка:
    //     Инициализирует новый экземпляр класса VacancyManager.Services.AuthorizeErrorAttribute.
    [Inject]
    public AuthorizeErrorAttribute() : base() { }

    //
    // Сводка:
    //     Обрабатывает HTTP-запрос, не прошедший авторизацию.
    //
    // Параметры:
    //   filterContext:
    //     Инкапсулирует сведения для использования объекта System.Web.Mvc.AuthorizeAttribute.
    //     Объект filterContext содержит контроллер, контекст HTTP, контекст запроса,
    //     результат действия и данные маршрута.
    protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
    {
      if (filterContext.HttpContext.Request.IsAjaxRequest())
      {
        filterContext.HttpContext.Response.StatusCode = 401;
        filterContext.HttpContext.Response.End();
      }
      else
      {
          filterContext.HttpContext.Response.StatusCode = 401;
          filterContext.Result = new ViewResult { ViewName = "Access Denied" };
      }
    }
  }
}
