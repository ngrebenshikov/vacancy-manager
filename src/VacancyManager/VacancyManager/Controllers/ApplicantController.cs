﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using System.Web.Script.Serialization;

namespace VacancyManager.Controllers
{
    public class ApplicantController : Controller
    {
        [HttpGet]
        public ActionResult Load()
        {
            var list = ApplicantManager.GetList();
            var obj = from applicant in list
                      select new
                      {
                          ApplicantID = applicant.ApplicantID,
                          FullName = applicant.FullName,
                          ContactPhone = applicant.ContactPhone,
                          Email = applicant.Email
                      };

            return Json(new
            {
                success = true,
                data = obj
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Create(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении соискателя";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<Applicant> created = new List<Applicant>();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                created = ApplicantManager.Create(obj["FullName"].ToString(), obj["ContactPhone"].ToString(), obj["Email"].ToString());
                resultMessage = "Соискатель конфигурации успешно добавлен";
                success = true;
            }
            else
                created = null;

            return Json(new
            {
                success = success,
                data = created,
                message = resultMessage
            }, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult Delete(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при удалении соискателя";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                ApplicantManager.Delete(int.Parse(obj["ApplicantID"].ToString()));
                resultMessage = "Соискатель успешно удален";
                success = true;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }

        [HttpPost]
        public ActionResult Update(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при изменении соискателя";
            JavaScriptSerializer jss = new JavaScriptSerializer();

            if (data != null)
            {
                var obj = jss.Deserialize<dynamic>(data);
                ApplicantManager.Update(obj["ApplicantID"], obj["FullName"].ToString(), obj["ContactPhone"].ToString(), obj["Email"].ToString());
                resultMessage = "соискатель успешно изменен";
                success = true;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }
    }
}
