using System.Web.Mvc;

namespace VacancyManager.Controllers
{
  public class HomeController : Controller
  {
    //
    // GET: /Home/
    public ActionResult Index()
    {
      return View();
    }

    public ActionResult IndexOld()
    {
      return View();
    }
  }
}