using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemVA.Entities;
using OrderingSystemVA.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Foods.Dto
{
    [AutoMapFrom(typeof(FoodDto))]
    [AutoMapTo(typeof(Food))]

    public class CreateFoodDto : EntityDto<int>
    {
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public int? CategoryId { get; set; }
        public Category Category { get; set; }
        public int? TypeId { get; set; }
        public Entities.Type Type { get; set; }
        public string? Size { get; set; }
        [Required]
        [DataType("decimal(18,2)")]
        public decimal Price { get; set; }
    }
}
