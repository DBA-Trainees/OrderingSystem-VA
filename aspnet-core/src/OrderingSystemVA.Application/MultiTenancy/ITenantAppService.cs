using Abp.Application.Services;
using OrderingSystemVA.MultiTenancy.Dto;

namespace OrderingSystemVA.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

