using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemVA.Customers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>
    {
        Task<PagedResultDto<CustomerDto>> GetAllCustomersWithDivisions(PagedCustomerResultRequestDto input);
    }
}
