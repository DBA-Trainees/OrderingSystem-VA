using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystemVA.Authorization;
using OrderingSystemVA.Types.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Types
{
    [AbpAuthorize(PermissionNames.Pages_Types)]
    public class TypeAppService : AsyncCrudAppService<Entities.Type, TypeDto, int, PagedTypeResultRequestDto, CreateTypeDto, TypeDto>, ITypeAppService
    {
        private readonly IRepository<Entities.Type, int> _repository;
        public TypeAppService(IRepository<Entities.Type, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<TypeDto> CreateAsync(CreateTypeDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<TypeDto>> GetAllAsync(PagedTypeResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<TypeDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<TypeDto> UpdateAsync(TypeDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Entities.Type> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        public async Task<List<TypeDto>> GetAllTypes()
        {
            var query = await _repository.GetAll()
                .Select(x => ObjectMapper.Map<TypeDto>(x))
                .ToListAsync();

            return query;
        }
    }
}
