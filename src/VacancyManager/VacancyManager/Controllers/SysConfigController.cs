using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using VacancyManager.Models;
using VacancyManager.Services.Managers;
using VacancyManager.Services;

namespace VacancyManager.Controllers
{
    [AuthorizeError(Roles = "Admin")]
    public class SysConfigController : Controller
    {
        [HttpGet]
        public ActionResult GetList()
        {
            var list = SysConfigManager.GetList();

            return Json(new
            {
                success = true,
                SysConfigList = list
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Create(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при добавлении параметра конфигурации";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            dynamic[] createdList = new dynamic[1];
            SysConfig obj = new SysConfig();

            if (data != null)
            {
                var sysConf = jss.Deserialize<dynamic>(data);
                obj = SysConfigManager.Create(sysConf["Name"].ToString(), sysConf["Value"].ToString());
                createdList[0] = new
                {
                    Name = sysConf["Name"].ToString(),
                    Value = sysConf["Value"].ToString()
                };
                resultMessage = "Параметр конфигурации успешно добавлен";
                success = true;
            }

            if (success)
            {
                return Json(new
                {
                    success = success,
                    SysConfigList = obj,
                    message = resultMessage
                });
            }
            else
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
            string resultMessage = "Ошибка при изменении параметра конфигурации";
            JavaScriptSerializer jss = new JavaScriptSerializer();

            if (data != null)
            {
                var sysConf = jss.Deserialize<dynamic>(data);
                int id = int.Parse(sysConf["Id"].ToString());
                SysConfigManager.Update(id, sysConf["Name"], sysConf["Value"]);
                resultMessage = "Параметр конфигурации успешно изменен";
                success = true;
            }

            return Json(new
            {
                success = success,
                message = resultMessage
            });
        }

        [HttpPost]
        public ActionResult Delete(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при удалении параметра конфигурации";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var sysConf = jss.Deserialize<dynamic>(data);
                SysConfigManager.Delete(int.Parse(sysConf["Id"].ToString()));
                resultMessage = "Параметр конфигурации успешно удален";
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
