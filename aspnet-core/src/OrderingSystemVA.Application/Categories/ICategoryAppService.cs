using Abp.Application.Services;
using OrderingSystemVA.Categories.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Categories
{
    public interface ICategoryAppService : IAsyncCrudAppService<CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>
    {
    }
}
