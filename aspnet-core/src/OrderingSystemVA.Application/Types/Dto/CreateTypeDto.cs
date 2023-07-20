using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Types.Dto
{
    [AutoMapFrom(typeof(TypeDto))]
    [AutoMapTo(typeof(Entities.Type))]

    public class CreateTypeDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
