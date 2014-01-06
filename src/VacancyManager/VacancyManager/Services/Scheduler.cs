using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web.Mail;
using System.Web;
using System.Net;
using VacancyManager.Services.Managers;

namespace VacancyManager.Services
{
    public class Scheduler : IDisposable
    {
        /// <summary>
        /// Determines the status fo the Scheduler
        /// </summary>        
        public bool Cancelled
        {
            get { return _Cancelled; }
            set { _Cancelled = value; }
        }
        private bool _Cancelled = false;


        /// <summary>
        /// The frequency of checks against hte POP3 box are 
        /// performed in Seconds.
        /// </summary>
        private int CheckFrequency = 180;

        AutoResetEvent WaitHandle = new AutoResetEvent(false);

        object SyncLock = new Object();

        public Scheduler()
        {

        }

        /// <summary>
        /// Starts the background thread processing       
        /// </summary>
        /// <param name="CheckFrequency">Frequency that checks are performed in seconds</param>
        public void Start(int checkFrequency)
        {
            

            // *** Ensure that any waiting instances are shut down
            //this.WaitHandle.Set();

            this.CheckFrequency = checkFrequency;
            this.Cancelled = false;

            Thread t = new Thread(Run);
            t.Start();
        }

        /// <summary>
        /// Causes the processing to stop. If the operation is still
        /// active it will stop after the current message processing
        /// completes
        /// </summary>
        public void Stop()
        {
            lock (this.SyncLock)
            {
                if (Cancelled)
                    return;

                this.Cancelled = true;
                this.WaitHandle.Set();
            }
        }

        /// <summary>
        /// Runs the actual processing loop by checking the mail box
        /// </summary>
        private void Run()
        {
    
            // *** Start out  waiting
            this.WaitHandle.WaitOne(this.CheckFrequency * 1000, true);

            while (!Cancelled)
            {
                VMMailMessageManager.UpdateMailsListFromIMAP();
                this.WaitHandle.WaitOne(this.CheckFrequency * 100000, true);

            }

        }

        public void PingServer()
        {
            try
            {
                WebClient http = new WebClient();

            }
            catch (Exception ex)
            {
                string Message = ex.Message;
            }
        }


        #region IDisposable Members

        public void Dispose()
        {
            this.Stop();
        }

        #endregion
    }
}