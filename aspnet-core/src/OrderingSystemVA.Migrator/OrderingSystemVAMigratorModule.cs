using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystemVA.Configuration;
using OrderingSystemVA.EntityFrameworkCore;
using OrderingSystemVA.Migrator.DependencyInjection;

namespace OrderingSystemVA.Migrator
{
    [DependsOn(typeof(OrderingSystemVAEntityFrameworkModule))]
    public class OrderingSystemVAMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public OrderingSystemVAMigratorModule(OrderingSystemVAEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(OrderingSystemVAMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                OrderingSystemVAConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderingSystemVAMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
