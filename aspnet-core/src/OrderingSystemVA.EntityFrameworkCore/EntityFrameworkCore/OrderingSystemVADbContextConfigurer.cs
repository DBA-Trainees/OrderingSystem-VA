using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace OrderingSystemVA.EntityFrameworkCore
{
    public static class OrderingSystemVADbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<OrderingSystemVADbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<OrderingSystemVADbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
