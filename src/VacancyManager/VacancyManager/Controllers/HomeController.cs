using System.Web.Mvc;
using VacancyManager.Services;

namespace VacancyManager.Controllers
{ 
    public class HomeController : Controller
    {
        private readonly IRepository _repository;

        public HomeController(IRepository repository)
        {
            _repository = repository;
        }

        //
        // GET: /Home/

        public ActionResult Index()
        {
            var vacancyList = _repository.AllVisibleVacancies();

            return View(vacancyList);
        }

        protected override void Dispose(bool disposing)
        {
            _repository.Dispose();
            base.Dispose(disposing);
        }
    }
}