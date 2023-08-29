using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemVA.Authorization;
using OrderingSystemVA.Entities;
using OrderingSystemVA.Foods.Dto;
using OrderingSystemVA.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Orders
{

    //[AbpAuthorize(PermissionNames.Pages_Orders)]
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _repository;

        public OrderAppService(IRepository<Order, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            var order = ObjectMapper.Map<Order>(input);

            if (order.FoodId == input.FoodId)
            {
                
            }

            //return base.MapToEntityDto(order);
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<OrderDto>> GetAllAsync(PagedOrderResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<OrderDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<OrderDto> UpdateAsync(OrderDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Order> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        public async Task<PagedResultDto<OrderDto>> GetAllOrderWithFood(PagedOrderResultRequestDto input)
        {
            var query = await _repository.GetAllIncluding(x => x.Food)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(query.Count(), query);


    //        var query = _repository.GetAll()
    //        .Include(x => x.Food);
    //        var food = new OrderDto()
    //        {
    //            Food = query
    //        };
    //        return new PagedResultDto<OrderDto>(query.Count, query);
        }

    }
}
