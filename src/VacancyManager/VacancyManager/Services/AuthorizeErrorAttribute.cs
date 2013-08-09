using System;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;

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

    /// <summary>
    /// Вызывается, когда процесс запрашивает авторизацию.
    /// </summary>
    /// <param name="filterContext">Контекст фильтра, инкапсулирующий сведения для использования объекта <see cref="T:System.Web.Mvc.AuthorizeAttribute"/>.</param>
    /// <exception cref="T:System.ArgumentNullException">Параметр <paramref name="filterContext"/> имеет значение null.</exception>
    public override void OnAuthorization(AuthorizationContext filterContext)
    {
      if (filterContext == null)
      {
        throw new ArgumentNullException("filterContext");
      }

      //if (!filterContext.HttpContext.Request.IsAjaxRequest())//Если Ajax запрос
      //{
      //  filterContext.Result = new ViewResult { ViewName = "Access Denied" };
      //  return;
      //}

      if (!filterContext.HttpContext.User.Identity.IsAuthenticated//Не авторизован
        //И авторизация требуется для метода или контроллера
          && (filterContext.ActionDescriptor.GetCustomAttributes(typeof(AuthorizeAttribute), true).Any()
              || filterContext.ActionDescriptor.ControllerDescriptor.GetCustomAttributes(typeof(AuthorizeAttribute), true).Any())
        || !(AuthorizeCore(filterContext.HttpContext)))
      {
        filterContext.HttpContext.SkipAuthorization = true;
        filterContext.HttpContext.Response.Clear();
        filterContext.HttpContext.Response.StatusCode = (int)System.Net.HttpStatusCode.Unauthorized;
        filterContext.Result = new HttpUnauthorizedResult("Unauthorized");
        filterContext.Result.ExecuteResult(filterContext.Controller.ControllerContext);
        filterContext.HttpContext.Response.End();
      }

    }

  }
}
