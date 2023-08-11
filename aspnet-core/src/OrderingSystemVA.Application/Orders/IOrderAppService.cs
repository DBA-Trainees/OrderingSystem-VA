using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemVA.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Orders
{
    public interface IOrderAppService : IAsyncCrudAppService<OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>
    {
        Task<PagedResultDto<OrderDto>> GetAllOrderWithFood(PagedOrderResultRequestDto input);
    }
}
