using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services;
using VacancyManager.Services.Managers;
using System.Web.Security;

namespace VacancyManager.Controllers
{
    public class FrontEndController : BaseController
    {
        // GET: /FrontEnd/

        public ActionResult Index(string id)
        {
            object model = null;
            Applicant App = new Applicant();
            Vacancy Vac = VacancyDbManager.GetVacancy(id);

            VMMembershipUser vmuser = (VMMembershipUser)Membership.GetUser(User.Identity.Name);

            if (vmuser != null)
            {

                App = ApplicantManager.GetApplicantByEMail(vmuser.Email) ?? new Applicant();

                if (Vac!= null)
                {
                    if (Vac.VacancyID != 0)
                    {
                        if (!ConsiderationsManager.IsApplicantConsiderationExist(App.ApplicantID, Vac.VacancyID))
                        {
                            ConsiderationsManager.CreateConsideration(Vac.VacancyID, App.ApplicantID);
                        }
                    }
                }
            }

            object appModel = new
            {
                ApplicantID = App.ApplicantID,
                FullName = App.FullName,
                FullNameEn = App.FullNameEn,
                ContactPhone = App.ContactPhone,
                Employed = App.Employed,
                Email = vmuser!= null ? vmuser.Email: App.Email,
                Requirements = ""
            };

            return View(new
            {
                VacancyKey = id,
                Applicant = appModel
            });
        }

    }
}
