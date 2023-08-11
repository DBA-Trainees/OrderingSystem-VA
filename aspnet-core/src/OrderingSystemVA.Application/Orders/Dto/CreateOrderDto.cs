using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemVA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Orders.Dto
{
    [AutoMapFrom(typeof(OrderDto))]
    [AutoMapTo(typeof(Order))]

    public class CreateOrderDto : EntityDto<int>
    {
        public int? FoodId { get; set; }
        public Food Food { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
    }
}
