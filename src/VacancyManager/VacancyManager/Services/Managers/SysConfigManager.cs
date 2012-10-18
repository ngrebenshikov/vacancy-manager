using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VacancyManager.Models;

namespace VacancyManager.Services.Managers
{
    internal static class SysConfigManager
    {
        static VacancyContext _db = new VacancyContext();

        internal static IEnumerable<SysConfig> GetList()
        {
            var objList = _db.SysConfigs.ToList();

            return objList;
        }

        internal static void Create(string name, string value)
        {
            var obj = new SysConfig
            {
                Name = name,
                Value = value
            };

            _db.SysConfigs.Add(obj);
            _db.SaveChanges();
        }

        internal static void Update(int id, string name, string value)
        {
            var obj = _db.SysConfigs.Where(conf => conf.Id == id).Single();

            if (obj != null)
            {
                obj.Name = name;
                obj.Value = value;
            };

            _db.SaveChanges();
        }

        internal static void Delete(int id)
        {
            var obj = _db.SysConfigs.Where(conf => conf.Id == id).Single();

            if (obj != null)
            {
                _db.SysConfigs.Remove(obj);
                _db.SaveChanges();
            }
        }
    }
}