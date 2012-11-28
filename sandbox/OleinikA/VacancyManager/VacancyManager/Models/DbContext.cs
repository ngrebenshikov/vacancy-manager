using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace VacancyManager.Models
{
    public class Db : DbContext
    {
         public Db()
            : base("name=VacancyContext")
        {
        }

        public DbSet<User> Users { get; set; }

        public class UserContextInitializer : DropCreateDatabaseIfModelChanges<Db>
        {
            public UserContextInitializer()
            {
            }

            protected override void Seed(Db context)
            {
                SeedIt(context);


                //base.Seed(context);
            }

            public  void SeedIt(Db context)
            {
                const string presidents =
                    @"George Washington;
                    John Adams;
                    Thomas Jefferson;
                    James Madison;
                    James Monroe;
                    John Quincy Adams;
                    Andrew Jackson;
                    Martin Van Buren;
                    William Henry Harrison;
                    John Tyler;
                    James K. Polk;
                    Zachary Taylor;
                    Millard Fillmore;
                    Franklin Pierce;
                    James Buchanan;
                    Abraham Lincoln;
                    Andrew Johnson;
                    Ulysses S. Grant;
                    Rutherford B. Hayes;
                    James A. Garfield;
                    Chester A. Arthur;
                    Grover Cleveland;
                    Benjamin Harrison;
                    Grover Cleveland (2nd term);
                    William McKinley;
                    Theodore Roosevelt;
                    William Howard Taft;
                    Woodrow Wilson;
                    Warren G. Harding;
                    Calvin Coolidge;
                    Herbert Hoover;
                    Franklin D. Roosevelt;
                    Harry S. Truman;
                    Dwight D. Eisenhower;
                    John F. Kennedy;
                    Lyndon B. Johnson;
                    Richard Nixon;
                    Gerald Ford;
                    Jimmy Carter;
                    Ronald Reagan;
                    George H. W. Bush;
                    Bill Clinton;
                    George W. Bush;
                    Barack Obama";

                var presidentList = presidents.Split(new[] {';'}).ToList();

                foreach (var rec in presidentList)
                {
                    string cleanName = Regex.Replace(rec, @"[^ -~]", "").Trim();
                    context.Users.Add(new User()
                                          {
                                              UserName = cleanName,
                                              Email =
                                                  String.Format("{0}@whitehouse.gov",
                                                                cleanName.Replace(" ", ".").Replace("(", "").Replace(")", "").Trim())
                                          });
                }
                context.SaveChanges();
            }
        }


        //public void InsertOrUpdate(TaskInfo result)
        //{
        //    if (result.Id == default(int))
        //    {
        //        // New entity

        //    }
        //    else
        //    {
        //        var rec =
        //            SponsorListManager.I.Get(new SponsorListQuery { Id = result.Id }).FirstOrDefault();
        //        if (rec != null)
        //        {
        //            if (HttpContext.Current.User.Identity.Name.Equals("admin"))
        //            {
        //                rec.ImageURL = result.ImageURL ?? string.Empty;
        //                rec.NavigateURL = result.NavigateURL ?? string.Empty;
        //                rec.HoverOverText = result.HoverOverText ?? string.Empty;
        //                rec.UnderLogoText = result.UnderLogoText ?? string.Empty;
        //            }

        //            rec.SponsorName = result.SponsorName ?? string.Empty;
        //            rec.Comment = result.Comment ?? string.Empty;
        //            rec.NextActionDate = result.NextActionDate;
        //            SponsorListManager.I.Update(rec);
        //        }
        //    }
        //}


    }
}