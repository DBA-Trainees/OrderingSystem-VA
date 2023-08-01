using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Microsoft.EntityFrameworkCore;
using OrderingSystemVA.Authorization;
using OrderingSystemVA.Authorization.Users;
using OrderingSystemVA.Customers.Dto;
using OrderingSystemVA.Entities;
using OrderingSystemVA.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Customers
{
    [AbpAuthorize(PermissionNames.Pages_Customers)]
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>, ICustomerAppService
    {
        private readonly IRepository <Customer, int> _repository;

        public CustomerAppService(IRepository<Customer, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<CustomerDto> CreateAsync(CreateCustomerDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedCustomerResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CustomerDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CustomerDto> UpdateAsync(CustomerDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Customer> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        public async Task<PagedResultDto<CustomerDto>> GetAllCustomersWithDivisions(PagedCustomerResultRequestDto input)
        {
            var query = await _repository.GetAll()
                .Include(x => x.Division)
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(query.Count, query);
        }

    }
}
