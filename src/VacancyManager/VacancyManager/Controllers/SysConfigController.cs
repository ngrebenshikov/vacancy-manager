using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using VacancyManager.Models;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{
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
            if (data != null)
            {
                var sysConf = jss.Deserialize<dynamic>(data);
                SysConfigManager.Create(sysConf["Name"].ToString(), sysConf["Value"].ToString());
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
                    SysConfigList = createdList,
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
        public ActionResult Delete(string data)
        {
            bool success = false;
            string resultMessage = "Ошибка при удалении параметра конфигурации";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var sysConf = jss.Deserialize<dynamic>(data);
                SysConfigManager.Delete(sysConf["Name"].ToString());
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
