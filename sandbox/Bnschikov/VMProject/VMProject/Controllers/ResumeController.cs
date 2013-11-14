using System.Web.Mvc;
using VMProject.Models;
using VMProject.ViewModel;

namespace VMProject.Controllers
{
    public class ResumeController : Controller
    {
        private VacancyContext db = new VacancyContext();

        //
        // GET: /Rsume/

        public ActionResult Send(int id)
        {
            var resume = new ResumeView();
            resume.Vacancy = db.Vacancies.Find(id);
            return View(resume);
        }

        [HttpPost]
        public ActionResult Send(int id, Applicant applicant)
        {
            db.Applicants.Add(applicant);
            db.Vacancies.Find(id).Applicants.Add(applicant);
            db.SaveChanges();
            return RedirectToAction("Index", "Vacancy");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
