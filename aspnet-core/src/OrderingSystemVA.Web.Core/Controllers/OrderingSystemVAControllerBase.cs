using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace OrderingSystemVA.Controllers
{
    public abstract class OrderingSystemVAControllerBase: AbpController
    {
        protected OrderingSystemVAControllerBase()
        {
            LocalizationSourceName = OrderingSystemVAConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
