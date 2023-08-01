using Abp.Application.Services;
using OrderingSystemVA.Types.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Types
{
    public interface ITypeAppService : IAsyncCrudAppService<TypeDto, int, PagedTypeResultRequestDto, CreateTypeDto, TypeDto>
    {
        Task<List<TypeDto>> GetAllTypes();
    }
}
