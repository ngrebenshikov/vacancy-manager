using System.Web.Mvc;
using VacancyManager.Controllers;

namespace VacancyManager.Services
{
    public class ExceptionErrorAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            filterContext.ExceptionHandled = true;
            filterContext.Result = new JsonResult
            {
                Data = new 
                { 
                    success = false, 
                    message = filterContext.Exception.Message + " " + filterContext.Controller.ToString()
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}