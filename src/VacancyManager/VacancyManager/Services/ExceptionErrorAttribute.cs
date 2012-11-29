using System.Web.Mvc;
using VacancyManager.Controllers;

namespace VacancyManager.Services
{
    public class ExceptionErrorAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            filterContext.ExceptionHandled = true;

            string exception = filterContext.Exception.InnerException != null ?
                filterContext.Exception.InnerException.InnerException.Message :
                filterContext.Exception.Message;
            filterContext.Result = new JsonResult
            {
                Data = new 
                { 
                    success = false,
                    message = exception + " " + filterContext.Controller.ToString()
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}