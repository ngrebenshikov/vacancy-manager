/*Всё, что от вас требуется — найти сумму всех целых чисел, лежащих между 1 и N включительно.*/
using System;
class main
{
    public static int Main()
    {
        int n, i, s;
        s = 0;
        ///Console.Write("Введите число N: ");
        n = Convert.ToInt16(Console.ReadLine());
        if (n <= 0)
        {
            for (i = n; i <= 1; i++)
            {
                s = s + i;
            }
        }
        else
        {
            for (i = 1; i <= n; i++)
            {
                s = s + i;
            }
        }
        Console.WriteLine(s);
        //Console.ReadLine();
        return 0;
    }
}