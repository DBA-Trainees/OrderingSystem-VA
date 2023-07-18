using Abp.Application.Services;
using OrderingSystemVA.Divisions.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Divisions
{
    public interface IDivisionAppService : IAsyncCrudAppService<DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>
    {
        Task<List<DivisionDto>> GetAllDivisions();
    }
}
