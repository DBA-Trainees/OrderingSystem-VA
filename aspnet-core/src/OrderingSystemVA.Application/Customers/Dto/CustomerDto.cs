using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemVA.Divisions.Dto;
using OrderingSystemVA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Customers.Dto
{
    [AutoMapFrom(typeof(Customer))]
    [AutoMapTo(typeof(Customer))]

    public class CustomerDto : EntityDto<int>
    {
        public string Name { get; set; }
        public int DivisionId { get; set; }
        public DivisionDto Division { get; set; }

    }
}
