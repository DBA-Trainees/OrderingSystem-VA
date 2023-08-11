using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using OrderingSystemVA.Authorization.Roles;
using OrderingSystemVA.Authorization.Users;
using OrderingSystemVA.MultiTenancy;
using OrderingSystemVA.Entities;

namespace OrderingSystemVA.EntityFrameworkCore
{
    public class OrderingSystemVADbContext : AbpZeroDbContext<Tenant, Role, User, OrderingSystemVADbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public OrderingSystemVADbContext(DbContextOptions<OrderingSystemVADbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Division> Divisions { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Type> Types { get; set; }
        public virtual DbSet<Food> Foods { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
    }
}
