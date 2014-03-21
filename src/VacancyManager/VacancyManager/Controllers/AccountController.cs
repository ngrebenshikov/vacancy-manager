using System;
using System.Web.Mvc;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManager.Services;
using VacancyManager.Services.Managers;
using VacancyManager;
using System.Web.Script.Serialization;
using System.Collections.Generic;

namespace VacancyManager.Controllers
{
  //TODO:Разобрать код на отностящийся к ExtJS и на всё что относится к ASP.NET MVC
  public class AccountController : BaseController
  {

    //
    // GET: /Account/LogOn

    public ActionResult LogOn()
    {
      return View();
    }

    //
    // POST: /Account/LogOn

    [HttpPost]
    public ActionResult LogOn(LogOnModel model, string returnUrl)
    {
      if (ModelState.IsValid)
      {
        if (Membership.ValidateUser(model.UserName, model.Password))
        {
          FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);
          if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
              && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
          {
            return Redirect(returnUrl);
          }
          return RedirectToAction("IndexOld", "Home");
        }
        ModelState.AddModelError("", "Имя пользователя или пароль указаны неверно.");
      }

      // Появление этого сообщения означает наличие ошибки; повторное отображение формы
      return View(model);
    }

    //
    // GET: /Account/LogOff

    public ActionResult LogOff()
    {
      FormsAuthentication.SignOut();

      return RedirectToAction("IndexOld", "Home");
    }

    //
    // GET: /Account/Register

    public ActionResult Register()
    {
      return View();
    }

    //
    // POST: /Account/Register

    [HttpPost]
    public ActionResult Register(string regForm)
    {
        Tuple<bool, string, VMMembershipUser>  Info;
        JavaScriptSerializer jss = new JavaScriptSerializer();
        Applicant app = null;
        var obj = jss.Deserialize<dynamic>(regForm);

        // Попытка зарегистрировать пользователя
 
        Info = SharedCode.CreateNewUser(obj["UserName"].ToString(), obj["Email"].ToString(), obj["UserPassword"].ToString(), false, false);

        if (Info.Item1)
        {
            VMMembershipUser newUser = Info.Item3;
                string ActivationLink = "Activate/" + newUser.UserName + "/" + newUser.EmailKey;

                string body = "Hello " + obj["UserName"].ToString() + ",";
                body += "<br/><br />Please click the following link to activate your account";
                body += "<br/><a href = '" + Request.Url.AbsoluteUri.Replace("Register", ActivationLink) + "'>Click here to activate your account.</a>";
                body += "<br/><br/>Thanks";

                string msgStatus = MailSender.SendTo(newUser.Email, "Активация аккаунта", body, false, null, 0);

           app = ApplicantManager.Create(obj["FullName"].ToString(), obj["FullNameEn"].ToString(), obj["ContactPhone"].ToString(), obj["Email"].ToString(), false);

        }

      return Json(new
      {
          success = true,
          info = Info

      }, JsonRequestBehavior.AllowGet);

    }

    [HttpGet]
    public ActionResult ConfirmReg(int id)
    {
      ViewBag.Message = id == 1 ? "Для ипользования аккаунта его нужно активировать! Вам выслано письмо на почту." : "При отправке письма для активации произошла ошибка. Свяжитесь с администратором сайта.";
      return View();
    }

    [Obsolete("Возможно должен быть переделан")]
    public ActionResult Activate(string username, string key)
    {
      VMMembershipUser user = (VMMembershipUser)Membership.GetUser(username, false);
      if (user != null)
      {
          user.UnlockUser();
          //user.IsApproved = true; //Активировали
          user.EmailKey = null; //Чтобы нельзя было больше активировать user
          Membership.UpdateUser(user);
      }
      return RedirectToAction("Index", "FrontEnd");
         
    }


    //
    // GET: /Account/ChangePassword

    [Authorize]
    public ActionResult ChangePassword()
    {
      return View();
    }

    //
    // POST: /Account/ChangePassword

    [Authorize]
    [HttpPost]
    public ActionResult ChangePassword(ChangePasswordModel model)
    {
      if (ModelState.IsValid)
      {

        // При некоторых сценариях сбоя операция смены пароля ChangePassword вызывает исключение,
        // а не возвращает значение false (ложь).
        bool changePasswordSucceeded;
        try
        {
          MembershipUser currentUser = Membership.GetUser(User.Identity.Name, true /* userIsOnline */);
          changePasswordSucceeded = currentUser.ChangePassword(model.OldPassword, model.NewPassword);
        }
        catch (Exception)
        {
          changePasswordSucceeded = false;
        }

        if (changePasswordSucceeded)
        {
          return RedirectToAction("ChangePasswordSuccess");
        }
        ModelState.AddModelError("", "Неправильный текущий пароль или недопустимый новый пароль.");
      }

      // Появление этого сообщения означает наличие ошибки; повторное отображение формы
      return View(model);
    }

    //
    // GET: /Account/ChangePasswordSuccess

    public ActionResult ChangePasswordSuccess()
    {
      return View();
    }




  }
}
