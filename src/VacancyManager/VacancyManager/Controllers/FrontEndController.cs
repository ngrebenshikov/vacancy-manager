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
            object appModel = null;
            Applicant App = null;
            int VacID = 0;

            VMMembershipUser vmuser = (VMMembershipUser)Membership.GetUser(User.Identity.Name);

            if (vmuser != null)
            {

                model = new
                    {
                        Email = vmuser.Email,
                        UserName = vmuser.UserName,
                        UserID = Convert.ToInt32(vmuser.ProviderUserKey)
                    };

                App = ApplicantManager.GetApplicantByEMail(vmuser.Email);

                if (id != null)
                {
                    Vacancy Vac = VacancyDbManager.GetVacancy(id);
                    if (Vac != null) { VacID = Vac.VacancyID; }
                }

                if (App == null) { App = new Applicant(); }
                else if (VacID != 0)
                {
                    if (!ConsiderationsManager.IsApplicantConsiderationExist(App.ApplicantID, VacID))
                    { 
                        ConsiderationsManager.CreateConsideration(VacID, App.ApplicantID); 
                    }
                    else { VacID = 0; }
                }
            }

            else
            {
                model = new
                {
                    Email = "",
                    UserName = "",
                    UserID = 0
                };

                App = new Applicant();
            }

            appModel = new
            {
                ApplicantID = App.ApplicantID,
                FullName = App.FullName,
                FullNameEn = App.FullNameEn,
                ContactPhone = App.ContactPhone,
                Employed = App.Employed,
                Email = App.Email,
                Requirements = ""
            };

            return View(new
            {
                User = model,
                VacId = VacID,
                Applicant = appModel
            });
        }

    }
}
