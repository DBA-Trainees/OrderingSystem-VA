using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystemVA.Configuration;

namespace OrderingSystemVA.Web.Host.Startup
{
    [DependsOn(
       typeof(OrderingSystemVAWebCoreModule))]
    public class OrderingSystemVAWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public OrderingSystemVAWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderingSystemVAWebHostModule).GetAssembly());
        }
    }
}
