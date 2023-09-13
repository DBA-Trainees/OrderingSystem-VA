using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystemVA.Enums;
using OrderingSystemVA.Foods.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Foods
{
    public interface IFoodAppService : IAsyncCrudAppService<FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>
    {
        Task<PagedResultDto<FoodDto>> GetAllFoodWithCategoryAndType(PagedFoodResultRequestDto input);
        //Task<IEnumerable<FoodSizeEnum>> GetAllSize();
    }
}
