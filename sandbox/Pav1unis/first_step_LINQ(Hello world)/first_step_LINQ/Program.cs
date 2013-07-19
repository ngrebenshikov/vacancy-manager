 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using System.Data.Linq.Mapping;


namespace first_step_LINQ
{
    static class Const
    {
        public const string local_instance = @"C:\DBSQL\HI\Hi world.mdf";
    }

    public class definition
    {
        public bool even(int num)
        {
            return ((num & 0x1) == 0);    
        }
        
    }    
    
    [Table(Name = "Stars")]
    public class Star
    {
       
        private string _IDstar;
        [Column(IsPrimaryKey = true, Storage = "_IDstar")]
       
        public string IDstar
        {
            get
            {
                return this._IDstar;
            }

            set
            {
                this._IDstar = value;
            }
        }

        private string _fname;
        [Column(Storage = "_fname")]

        public string fname
        {
            get
            {
                return this._fname;
            }
                
            set
            {
                this._fname = value;
            }
        }


        private string _lname;
        [Column(Storage = "_lname")]

        public string lname
        {
            get
            {
                return this._lname;
            }

            set
            {
                this._lname = value;
            }
        }

        

    }
  
    class Program
    {
        static void Main(string[] args)
        {
           DataContext conndb = new DataContext(Const.local_instance);
           Table<Star> Stars = conndb.GetTable<Star>();
           definition q = new definition();
          
           
           IQueryable<Star> custQery = from other in Stars
                                                      select other;
           foreach (Star other in custQery)
           {
               if (!q.even(Convert.ToInt32(other.IDstar)))
               {
                   Console.WriteLine(other.lname);
               }
           }
           
           Console.WriteLine("\nMy source:\n");
           foreach (Star other in custQery)
           {
               if (q.even(Convert.ToInt32(other.IDstar)))
               {
                   Console.WriteLine("{0} {1}", other.fname, other.lname);
               }
           }
          
           Console.ReadLine();
        }
    }
}
