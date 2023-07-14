using System.Threading.Tasks;
using Abp.Application.Services;
using OrderingSystemVA.Sessions.Dto;

namespace OrderingSystemVA.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
