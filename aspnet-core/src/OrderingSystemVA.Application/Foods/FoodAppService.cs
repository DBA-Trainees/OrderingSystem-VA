using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemVA.Entities;
using OrderingSystemVA.Enums;
using OrderingSystemVA.Foods.Dto;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Foods
{
    public class FoodAppService : AsyncCrudAppService<Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {

        private readonly IRepository<Food, int> _repository;
        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<FoodDto> CreateAsync(CreateFoodDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<FoodDto>> GetAllAsync(PagedFoodResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<FoodDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<FoodDto> UpdateAsync(FoodDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Food> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        public async Task<PagedResultDto<FoodDto>> GetAllFoodWithCategoryAndType(PagedFoodResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.Category)
                .Include(x => x.Type)
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();

            return new PagedResultDto<FoodDto>(query.Count, query);
        }

        public async Task<IEnumerable<FoodSizeEnum>> GetAllSize()
        {
            var query = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<FoodSizeEnum>(x))
                .ToListAsync();

            return query;
        }
        
    }
}
