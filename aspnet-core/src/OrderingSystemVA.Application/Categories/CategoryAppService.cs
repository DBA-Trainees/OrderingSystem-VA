﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Microsoft.EntityFrameworkCore;
using OrderingSystemVA.Authorization;
using OrderingSystemVA.Categories.Dto;
using OrderingSystemVA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Linq.Extensions;

namespace OrderingSystemVA.Categories
{
    //[AbpAuthorize(PermissionNames.Pages_Categories)]
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>, ICategoryAppService
    {

        private readonly IRepository<Category, int> _repository;

        public CategoryAppService(IRepository<Category, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<CategoryDto> CreateAsync(CreateCategoryDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CategoryDto>> GetAllAsync(PagedCategoryResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CategoryDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CategoryDto> UpdateAsync(CategoryDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Category> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        public async Task<List<CategoryDto>> GetAllCategories()
        {
            var query = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<CategoryDto>(x))
                .ToListAsync();

            return query;
        }

        protected override IQueryable<Category> CreateFilteredQuery(PagedCategoryResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));
        }
    }
}
