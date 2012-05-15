using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using VacancyManager.Services;

namespace VacancyManager.Controllers
{
  public class RolesController : Controller
  {

    private readonly IRepository _repository;//Нужно только для получения ID роли в базе
    //Это нехорошо, но редактировать роль по другому не выйдет.

    public RolesController(IRepository repository)
    {
      _repository = repository;
    }

    [HttpGet]
    [AuthorizeError]
    public ActionResult GetRoles()
    {
      var rolesList = (from role in Roles.GetAllRoles()
                       select new
                       {
                         RoleID = _repository.GetRoleID(role),
                         Name = role,
                       }).ToList();
      return Json(new
      {
        success = true,
        RolesList = rolesList,
      }, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    [AuthorizeError]
    public ActionResult AddRole(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при добавлении роли";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      dynamic[] rolesList = new dynamic[1];
      dynamic[] createdRoleList = new dynamic[1];
      if (data != null)
      {
        var role = jss.Deserialize<dynamic>(data);
        Roles.CreateRole(role["Name"].ToString());
        createdRoleList[0] = new
        {
          RoleID = _repository.GetRoleID(role["Name"].ToString()),
          Name = role["Name"].ToString()
        };
        resultMess = "Роль успешно добавлена";
        success = true;
      }
      if (success)
      {
        return Json(new
        {
          success = success,
          RolesList = createdRoleList,
          message = resultMess
        });
      }
      else
        return Json(new
        {
          success = success,
          message = resultMess
        });
    }

    [HttpPost]
    [AuthorizeError]
    public ActionResult DeleteRole(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при удалении роли";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      dynamic[] rolesList = new dynamic[1];
      if (data != null)
      {
        var role = jss.Deserialize<dynamic>(data);
        Roles.DeleteRole(role["Name"].ToString(), false);
        resultMess = "Роль успешно удалена";
        success = true;
      }
      return Json(new
      {
        success = success,
        message = resultMess
      });
    }
  }
}
