﻿using Abp.Application.Services.Dto;
using OrderingSystemVA.Roles.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Divisions.Dto
{
    public class PagedDivisionResultRequestDto: PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
