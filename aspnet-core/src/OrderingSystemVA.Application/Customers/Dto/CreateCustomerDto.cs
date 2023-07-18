using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemVA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Customers.Dto
{
    [AutoMapFrom(typeof(CustomerDto))]
    [AutoMapTo(typeof(Customer))]
    public class CreateCustomerDto : EntityDto<int>
    {
        public string Name { get; set; }

        public int DivisionId { get; set; }
    }
}
