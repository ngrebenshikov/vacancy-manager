using System.Collections.Generic;

namespace VacancyManager.Models
{
  public class Role
  {
    public int RoleID { get; set; }
    public string Name { get; set; }

    public virtual ICollection<User> User { get; set; }
  }
}