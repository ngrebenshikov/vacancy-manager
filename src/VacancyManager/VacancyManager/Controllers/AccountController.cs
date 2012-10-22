using System;
using System.Web.Mvc;
using System.Web.Security;
using VacancyManager.Models;
using VacancyManager.Services;
using VacancyManger;

namespace VacancyManager.Controllers
{
  //TODO:Разобрать код на отностящийся к ExtJS и на всё что относится к ASP.NET MVC
  public class AccountController : Controller
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
    public ActionResult Register(RegisterModel model)
    {
      if (ModelState.IsValid)
      {
        // Попытка зарегистрировать пользователя
        MembershipCreateStatus createStatus;
        Membership.CreateUser(model.UserName, model.Password, model.Email, null, null, true, null, out createStatus);

        if (createStatus == MembershipCreateStatus.Success)
        {
          //FormsAuthentication.SetAuthCookie(model.UserName, false /* createPersistentCookie */);
          var user = (VMMembershipUser)Membership.GetUser(model.UserName, false);
          string ActivationLink = "http://localhost:53662/Account/Activate/" +
                                    model.UserName + "/" + user.EmailKey;
          return RedirectToAction(EMailSender.SendMail(ActivationLink, model.Email) ? "ConfirmReg/1" : "ConfirmReg/0", "Account");
        }
        ModelState.AddModelError("", SharedCode.ErrorCodeToString(createStatus));
      }

      // Появление этого сообщения означает наличие ошибки; повторное отображение формы
      return View(model);
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
      if (user == null)
        return Redirect("Error");
      if (user.EmailKey != key)
        return RedirectToAction("IndexOld", "Home");
      user.UnlockUser();
      //user.IsApproved = true; //Активировали
      user.EmailKey = null; //Чтобы нельзя было больше активировать user
      Membership.UpdateUser(user);
      return RedirectToAction("LogOn");
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
