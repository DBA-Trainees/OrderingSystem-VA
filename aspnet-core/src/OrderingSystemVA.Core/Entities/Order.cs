using Abp.Domain.Entities.Auditing;
using OrderingSystemVA.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystemVA.Entities
{
    public class Order : FullAuditedEntity<int>
    {
        public int? FoodId { get; set; }
        public Food Food { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        [DataType("decimal(18,2)")]
        public decimal FoodPrice { get; set; }
        [DataType("decimal(18,2)")]
        public decimal TotalPrice { get; set; }
        public string? Notes { get; set; }
        public int Status { get; set; }
        public DateTime dateTimeOrdered { get; set; }
        public long? UserId { get; set; }
        public User User { get; set; }
    }
}
