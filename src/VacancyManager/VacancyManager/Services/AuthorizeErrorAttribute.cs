using System;
using System.Web.Mvc;
using System.Web.Helpers;

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
      if (filterContext.RequestContext.HttpContext.Request.ContentType != "application/json; charset=UTF-8")
      {
        filterContext.Result = new ViewResult { ViewName = "Access Denied" };
      }
      else
      {
        var result = new JsonResult();
        result.ContentType = "application/json";
        result.Data = new
        {
          success = false,
          message = "401",
        };
        result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
        filterContext.Result = result;
      }
    }
  }
}
