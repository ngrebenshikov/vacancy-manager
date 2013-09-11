﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;

namespace VacancyManager.Controllers
{
    public class UserInfoController : Controller
    {
        public JsonResult Get(int? start, int? limit)
        {
            using (var db = new Db())
            {
                start = start.HasValue ? start.Value : 0;
                limit = limit.HasValue ? limit.Value : Int32.MaxValue;
                int cnt = db.Users.Count();
                var recs = db.Users.OrderBy(a => a.UserID).
                    Skip(start.Value).Take(limit.Value).ToList();
                return Json(new
                {
                    Data = recs,
                    total = cnt
                }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public JsonResult Update(UserInfo data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null && data.Id > 0)
            {
                using (var db = new Db())
                {
                    var rec = db.Users.Where(a => a.UserID == data.Id).
                        FirstOrDefault();
                    rec.UserName = data.Name;
                    rec.Email = data.Email;
                    db.SaveChanges();
                    success = true;
                    message = "Update method called successfully";
                }
            }

            return Json(new
            {
                data,
                success,
                message
            });
        }
    }
}