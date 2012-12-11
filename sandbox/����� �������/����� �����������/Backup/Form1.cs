using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace find_sum_fact
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        int fact(int f)
        {
            int fact = 1;
            for (int i = 1; i <= f; i++)
                fact *= i;
            return fact;
        }

        int find_num(int num)
        {
            int i = 1;
            for (; ; )
            {
                int f = fact(i);
                if (num == f * 2)
                    return i;
                if (num < f)
                    return i - 1;
                i++;
            }
        }
        private void button1_Click(object sender, EventArgs e)
        {
            textBox2.Clear();
            int n = Convert.ToInt32(textBox1.Text);
            int[] mass = new int[100];
            String m = "";
            int i = 1;
            int q = n;
            int s = 0;
            int w = n;
            for (; ; )
            {
                if (i > 1)
                    q = find_num(n - s);
                else
                    q = find_num(q);
                s += fact(q);
                if(i == 1)
                    m += " = !" + q;
                else
                    m += " + !" + q;
                if (s >= w)
                    break;
                i++;
            }
            for (int j = m.Length - 1; j >= 0; j--)
                textBox2.Text = textBox2.Text + m.Substring(j, 1);
            textBox2.Text = textBox2.Text + n;
        }
    }
}
