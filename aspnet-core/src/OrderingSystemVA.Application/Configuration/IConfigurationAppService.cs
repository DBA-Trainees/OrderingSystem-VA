using System.Threading.Tasks;
using OrderingSystemVA.Configuration.Dto;

namespace OrderingSystemVA.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
