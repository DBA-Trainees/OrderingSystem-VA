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
        private readonly IRepository<Food, int> _foodRepository;

        public OrderAppService(IRepository<Order, int> repository, IRepository<Food, int> foodRepository) : base(repository)
        {
            _repository = repository;
            _foodRepository = foodRepository;
        }

        public async Task<OrderDto> UpdateOrderTable(OrderDto input)
        {
            var user = AbpSession.UserId;
            var orderEntity = ObjectMapper.Map<Order>(input);
            var order = await _repository.GetAll().AsNoTracking().Where(x => x.FoodId == input.FoodId && x.Size == input.Size && x.CreatorUserId == user).FirstOrDefaultAsync();

            try
            {               
                if (order == null)
                {
                    orderEntity.dateTimeOrdered = input.dateTimeOrdered.ToLocalTime();
                    await _repository.InsertAsync(orderEntity);
                    return ObjectMapper.Map<OrderDto>(orderEntity);
                }
                else
                {
                    order.Quantity += input.Quantity;
                    order.dateTimeOrdered = input.dateTimeOrdered.ToLocalTime();
                    await _repository.UpdateAsync(order);
                    return ObjectMapper.Map<OrderDto>(order);
                }
            }
            catch (System.Exception e)
            {
                throw e;
            }
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

        public override async Task<OrderDto> UpdateAsync(OrderDto input)
        {
            var order = ObjectMapper.Map<Order>(input);
            await _repository.UpdateAsync(order);


            var food = await _foodRepository.GetAsync(input.FoodId);
            food.Quantity -= order.Quantity;

            if (food.Quantity == 0)
            {
                food.Availability = false;
            }

            await _foodRepository.UpdateAsync(food);

            return base.MapToEntityDto(order);

        }

        protected override Task<Order> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        public async Task<PagedResultDto<OrderDto>> GetAllOrderWithFood(PagedOrderResultRequestDto input)
        {
            var userId = AbpSession.UserId;
            var query = await _repository.GetAllIncluding(x => x.Food)
                .Where(x => x.CreatorUserId == userId && x.Status == 0)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(query.Count(), query);
        }

        public async Task<OrderDto> GetOrderById(int id)
        {
            var query = await _repository.GetAll()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            return ObjectMapper.Map<OrderDto>(query);
        }

        public override Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            return base.CreateAsync(input);
        }

        //public override Task<OrderDto> UpdateAsync(OrderDto input)
        //{
        //    return base.UpdateAsync(input);
        //}
    }
}
