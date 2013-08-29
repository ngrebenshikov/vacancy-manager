    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Data.Linq;
    using System.Data.Linq.Mapping;


namespace linq
{
    static class Const
    {
        public const string database = @"D:\databases\hello_world.mdf";
    }

   

    [Table(Name = "Students")]
    public class Student
    {

        private string _ID_student;
        [Column(IsPrimaryKey = true, Storage = "_ID_student")]

        public string ID_student
        {
            get
            {
                return this._ID_student;
            }

            set
            {
                this._ID_student = value;
            }
        }

        private string _name;
        [Column(Storage = "_name")]

        public string name
        {
            get
            {
                return this._name;
            }

            set
            {
                this._name = value;
            }
        }


        private string _surname;
        [Column(Storage = "_surname")]

        public string surname
        {
            get
            {
                return this._surname;
            }

            set
            {
                this._surname = value;
            }
        }


    }

    class Program
    {
        static void Main(string[] args)
        {
            DataContext conndb = new DataContext(Const.database);
            Table<Student> Students = conndb.GetTable<Student>();
            IQueryable<Student> query = from other in Students
                                        select other;

            Console.WriteLine("\nMy database:\n");
            foreach (Student other in query)
            {

                Console.WriteLine("{0} {1}", other.name, other.surname);
            }

            Console.ReadLine();
        }
    }
}
