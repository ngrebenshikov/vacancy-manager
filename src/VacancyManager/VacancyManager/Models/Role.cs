namespace VacancyManager.Models
{
    public class Role
    {
        public int RoleID { get; set; }
        public string Name { get; set; }

        public virtual User User { get; set; }
    }
}