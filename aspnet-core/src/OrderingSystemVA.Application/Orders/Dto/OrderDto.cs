using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemVA.Authorization.Users;
using OrderingSystemVA.Entities;
using OrderingSystemVA.Foods.Dto;
using OrderingSystemVA.Users.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    [AutoMapFrom(typeof(Order))]   

    public class OrderDto : EntityDto<int>
    {
        public int FoodId { get; set; }
        public FoodDto Food { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public decimal FoodPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public string? Notes { get; set; }
        public int Status { get; set; }
        public DateTime dateTimeOrdered { get; set; }
        public long UserId { get; set; }
        public UserDto User { get; set; }
    }
}
