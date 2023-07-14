using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystemVA.EntityFrameworkCore;
using OrderingSystemVA.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace OrderingSystemVA.Web.Tests
{
    [DependsOn(
        typeof(OrderingSystemVAWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class OrderingSystemVAWebTestModule : AbpModule
    {
        public OrderingSystemVAWebTestModule(OrderingSystemVAEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderingSystemVAWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(OrderingSystemVAWebMvcModule).Assembly);
        }
    }
}