using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using OrderingSystemVA.Configuration.Dto;

namespace OrderingSystemVA.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : OrderingSystemVAAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
