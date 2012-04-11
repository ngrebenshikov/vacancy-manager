using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VacancyManager.Models;
using System.Collections.ObjectModel;
using VacancyManager.Services;
using System.Web.Script.Serialization;



namespace VacancyManager.Controllers
{
    public class UserController : Controller
    {
        private readonly IRepository _repository;


        public UserController(IRepository repository)
        {
            _repository = repository;
        }
     
        public ActionResult Index()
        {
            return View();
        }



        //User/load
        public JsonResult Load()
        { var AllUser = _repository.AllUsers();
       //     var VacanciesList = VisibleVacancies; 

        var UserList = (from User in AllUser
                        select new
                        {
                            UserID = User.UserID,
                            UserName = User.UserName,
                            Email = User.Email,
                            Password = User.Password,
                            UserComment = User.UserComment,
                            CreateDate = User.CreateDate,
                            LaslLoginDate = User.LaslLoginDate,
                            IsActivated = User.IsActivated,
                            IsLockedOut = User.IsLockedOut,
                            LastLockedOutDate = User.LastLockedOutDate,
                            LastLockedOutReason = User.LastLockedOutReason,
                            EmailKey = User.EmailKey,
                        }
                         ).ToList();
            return Json(new 
                           { data = UserList,
                             total = UserList.Count
                           }, 
                        JsonRequestBehavior.AllowGet);
        }
        //User/Create

        [HttpPost]
        public ActionResult Create(string data)
        {
            bool c_success = false;
            string c_message = "При создании пользователя произошла ошибка";
            JavaScriptSerializer jss = new JavaScriptSerializer();

            if (data != null)
            {
                var c_User = jss.Deserialize<dynamic>(data);

                object UserName = c_User["UserName"];
                object Email = c_User["Email"];
                object Password = c_User["Password"];
                object UserComment = c_User["UserComment"];
                object CreateDate = c_User["CreateDate"];
                object LaslLoginDate = c_User["LaslLoginDate"];
                object IsActivated = c_User["IsActivated"];
                object IsLockedOut = c_User["IsLockedOut"];
                object LastLockedOutDate = c_User["LastLockedOutDate"];
                object LastLockedOutReason = c_User["LastLockedOutReason"];
                object EmailKey = c_User["EmailKey"];
                if (CreateDate == null)
                    CreateDate = DateTime.Now.Date;
                if (LaslLoginDate == null)
                    LaslLoginDate = DateTime.Now.Date;
                if (LastLockedOutDate == null)
                    LastLockedOutDate = DateTime.Now.Date;

                _repository.AdminCreateUser(UserName.ToString(),
                                           Email.ToString(),
                                           Password.ToString(),
                                           UserComment.ToString(), 
                                           Convert.ToDateTime(CreateDate),
                                           Convert.ToDateTime(LaslLoginDate),
                                           Convert.ToBoolean(IsActivated),
                                           Convert.ToBoolean(IsLockedOut),                                           
                                           Convert.ToDateTime(LastLockedOutDate),                                    
                                           LastLockedOutReason.ToString(),
                                           EmailKey.ToString()
                 );
                c_message = "Пользователь создан";
                c_success = true;
            }               
            
            return Json(new
            {
                success = true,
                message = "Create method called successfully"
            });
        }
        
        [HttpPost]
        public ActionResult Update(string data)
        {
            bool u_success = false;
            string u_message = "Не удалось обновить список пользователей";
            JavaScriptSerializer jss = new JavaScriptSerializer();

            if (data != null)
            {
                var u_User = jss.Deserialize<dynamic>(data);
                object User_ID = u_User["UserID"];
                object UserName = u_User["UserName"];
                object Email = u_User["Email"];
                object Password = u_User["Password"];
                object UserComment = u_User["UserComment"];
                object CreateDate = u_User["CreateDate"];
                object LaslLoginDate = u_User["LaslLoginDate"];
                object IsActivated = u_User["IsActivated"];
                object IsLockedOut = u_User["IsLockedOut"];
                object LastLockedOutDate = u_User["LastLockedOutDate"];
                object LastLockedOutReason = u_User["LastLockedOutReason"];
                object EmailKey = u_User["EmailKey"];

                _repository.AdminUpdateUser(Convert.ToInt32(User_ID),
                                           UserName.ToString(),
                                           Email.ToString(),
                                           Password.ToString(),
                                           UserComment.ToString(),
                                           Convert.ToDateTime(CreateDate),
                                           Convert.ToDateTime(LaslLoginDate),
                                           Convert.ToBoolean(IsActivated),
                                           Convert.ToBoolean(IsLockedOut),
                                           Convert.ToDateTime(LastLockedOutDate),
                                           LastLockedOutReason.ToString(),
                                           EmailKey.ToString()
                 );

                u_message = "Список пользователей обновлен";
                u_success = true;
            }
            return Json(new
            {
                success = true,
                message = u_message
            });
        }


        [HttpPost]
        public ActionResult Delete(string data)
        {
            bool d_success = false;
            string d_message = "Не удалось удалить пользователя";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            if (data != null)
            {
                var d_User = jss.Deserialize<dynamic>(data);

                _repository.AdminDeleteUser(Convert.ToInt32(d_User["UserID"]));
                d_message = "Пользователь удалён";
                d_success = true;
            }
            return Json(new
            {
                success = d_success,
                message = d_message
            });
        }

       

    }
}







