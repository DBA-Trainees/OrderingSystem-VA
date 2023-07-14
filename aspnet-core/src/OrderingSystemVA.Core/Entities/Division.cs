﻿using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Entities
{
    public class Division : FullAuditedEntity<int>
    {
        public string Name { get; set; }
    }
}
