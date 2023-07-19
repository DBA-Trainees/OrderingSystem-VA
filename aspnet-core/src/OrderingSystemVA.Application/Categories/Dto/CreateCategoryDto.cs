using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystemVA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Categories.Dto
{
    [AutoMapFrom(typeof(CategoryDto))]
    [AutoMapTo(typeof(Category))]

    public class CreateCategoryDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
