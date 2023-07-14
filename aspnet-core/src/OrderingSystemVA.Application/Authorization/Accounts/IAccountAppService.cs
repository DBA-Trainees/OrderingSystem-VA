using System.Threading.Tasks;
using Abp.Application.Services;
using OrderingSystemVA.Authorization.Accounts.Dto;

namespace OrderingSystemVA.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
