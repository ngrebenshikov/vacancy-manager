using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using VacancyManager.Services;
using VacancyManager.Services.Managers;

namespace VacancyManager.Controllers
{
  [AuthorizeError(Roles = "Admin")]
  public class RolesController : Controller
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
      string resultMess = "Ошибка при добавлении роли";
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
    public ActionResult DeleteRole(string data)
    {
      bool success = false;
      string resultMess = "Ошибка при удалении роли";
      JavaScriptSerializer jss = new JavaScriptSerializer();
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
