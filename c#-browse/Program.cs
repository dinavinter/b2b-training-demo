using System;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace b2b_training_demo
{
    class Program
    {
        static void Main(string[] args)
        {
            WebHost.CreateDefaultBuilder(args)
                .Configure(config => config.UseStaticFiles())
                .UseWebRoot(@"D:\dvlp\b2b-training-demo")
                .Build()
                .Run();       
        }
    }
}
