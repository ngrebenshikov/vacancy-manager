using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using VacancyManager.Services;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{

  public class RolesController : AdminController
  {

    [HttpGet]
    public ActionResult GetRoles()
    {
      var rolesList = (from role in Roles.GetAllRoles()
                       select new
                       {
                         RoleID = SharedManager.GetRoleID(role),
                         Name = role,
                       }).ToList();
      return Json(new
      {
        success = true,
        RolesList = rolesList,
      }, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    public ActionResult AddRole(string data)
    {
      bool success = false;
      string message = "Ошибка при добавлении роли";
      JavaScriptSerializer jss = new JavaScriptSerializer();
      dynamic[] createdRoleList = new dynamic[1];

      if (data != null)
      {
        var role = jss.Deserialize<dynamic>(data);
        Roles.CreateRole(role["Name"].ToString());
        createdRoleList[0] = new
        {
          RoleID = SharedManager.GetRoleID(role["Name"].ToString()),
          Name = role["Name"].ToString()
        };
        message = "Роль успешно добавлена";
        success = true;
      }

      return success ? Json(new { success = true, RolesList = createdRoleList, message }) : Json(new { success = false, message });
    }

    [HttpPost]
    public ActionResult DeleteRole(string data)
    {
      bool success = false;
      string message = "Ошибка при удалении роли";
      JavaScriptSerializer jss = new JavaScriptSerializer();

      if (data != null)
      {
        var role = jss.Deserialize<dynamic>(data);
        Roles.DeleteRole(role["Name"].ToString(), false);
        message = "Роль успешно удалена";
        success = true;
      }

      return Json(new { success, message });
    }
  }
}
