using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Microsoft.EntityFrameworkCore;
using OrderingSystemVA.Authorization;
using OrderingSystemVA.Divisions.Dto;
using OrderingSystemVA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Divisions
{
    [AbpAuthorize(PermissionNames.Pages_Divisions)]
    public class DivisionAppService : AsyncCrudAppService<Division, DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>, IDivisionAppService
    {
        private readonly IRepository<Division, int> _repository; 

        public DivisionAppService(IRepository<Division, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<DivisionDto> CreateAsync(CreateDivisionDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<DivisionDto>> GetAllAsync(PagedDivisionResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<DivisionDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<DivisionDto> UpdateAsync(DivisionDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Division> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        public async Task<List<DivisionDto>> GetAllDivisions()
        {
            var query = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<DivisionDto>(x))
                .ToListAsync();

            return query;
        }

        //protected override IQueryable<Division> CreateFilteredQuery(PagedDivisionResultRequestDto input)
        //{
        //    return Repository.GetAllIncluding(x => x.Id)
        //        .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));
        //}
    }
}
