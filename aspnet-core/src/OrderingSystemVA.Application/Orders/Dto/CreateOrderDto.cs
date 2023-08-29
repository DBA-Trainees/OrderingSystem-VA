using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemVA.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public decimal TotalPrice { get; set; }
        public string Notes { get; set; }
    }
}
