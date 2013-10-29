using System;
using System.Linq;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services;
using System.Web.Script.Serialization;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{
    [AuthorizeError(Roles = "Admin")]
    public class VacancyRequirementController : BaseController
    {
        JavaScriptSerializer jss = new JavaScriptSerializer();
        // GET: /VacancyRequirement/

        [HttpGet]
        public JsonResult Load(int id)
        {
            var RequirementsStackList = RequirementsManager.GetAllRequirementStacks().ToList();
            var RequirementsList = RequirementsManager.GetRequirements().ToList();
            var VacancyRequirementsList = VacancyRequirementsManager.GetVacancyRequirements(id).ToList();

            var Complex = from o in RequirementsStackList
                          join v in RequirementsList on o.RequirementStackID equals v.RequirementStackID
                          join y in VacancyRequirementsList on v.RequirementID equals y.RequirementID into a
                          from b in a.DefaultIfEmpty(new VacancyRequirement())
                          select new
                          {
                              VacancyRequirementID = (b.VacancyRequirementID > -1 ? Convert.ToString(b.VacancyRequirementID) : ""),
                              StackName = o.Name,
                              VacancyID = id,
                              RequirementStackID = v.RequirementStackID,
                              RequirementID = v.RequirementID,
                              RequirementName = v.Name,
                              Comments = b.Comments,
                              IsRequire = b.IsRequire
                          };

            return Json(new
            {
                VacancyRequirements = Complex.ToList(),
                total = Complex.ToList().Count,
                success = true
            }, JsonRequestBehavior.AllowGet
            );
        }


        [HttpPost]
        public ActionResult Create(string[] data)
        {
            bool CreateSuccess = false;
            string CreateMessage = "При изменении требований произошла ошибка";


            if (data != null)
            {
                for (int i = 0; i <= data.Length - 1; i++)
                {
                    String Comments = "";
                    var u_vacancyrequirement = jss.Deserialize<dynamic>(data[i]);
                    Int32 VacancyRequirementID = Convert.ToInt32(u_vacancyrequirement["VacancyRequirementID"]);
                    Int32 VacancyID = Convert.ToInt32(u_vacancyrequirement["VacancyID"]);
                    Int32 RequirementID = Convert.ToInt32(u_vacancyrequirement["RequirementID"]);
                    Boolean IsRequire = Convert.ToBoolean(u_vacancyrequirement["IsRequire"]);
                   
                    if (IsRequire)
                    {
                        Comments = u_vacancyrequirement["Comments"].ToString();
                    }

                    VacancyRequirementsManager.CreateVacancyRequirement(VacancyID,
                                                                        RequirementID,
                                                                        Comments,
                                                                        IsRequire);


                }

                CreateSuccess = true;
                CreateMessage = "Требования успешно созданы";
            }

            return Json(new
            {
                success = CreateSuccess,
                message = CreateMessage
            });

        }

        [HttpPost]
        public ActionResult Update(string[] data)
        {
            bool UpdateSuccess = false;
            string UpdateMessage = "При изменении требований произошла ошибка";


            if (data != null)
            {
                for (int i = 0; i <= data.Length - 1; i++)
                {
                    String Comments = "";
                    var u_vacancyrequirement = jss.Deserialize<dynamic>(data[i]);
                    Int32 VacancyRequirementID = Convert.ToInt32(u_vacancyrequirement["VacancyRequirementID"]);
                    Int32 VacancyID = Convert.ToInt32(u_vacancyrequirement["VacancyID"]);
                    Int32 RequirementID = Convert.ToInt32(u_vacancyrequirement["RequirementID"]);

                    Boolean IsRequire = Convert.ToBoolean(u_vacancyrequirement["IsRequire"]);
                    if (IsRequire)
                    {
                        Comments = u_vacancyrequirement["Comments"].ToString();
                    }
                    VacancyRequirementsManager.UpdateVacancyRequirement(VacancyID,
                                                       VacancyRequirementID,
                                                       RequirementID,
                                                       Comments,
                                                       IsRequire);
                    UpdateSuccess = true;
                    UpdateMessage = "Требования успешно изменены";
                }

            }
            return Json(new
            {
                success = UpdateSuccess,
                message = UpdateMessage
            });
        }
    }
}

