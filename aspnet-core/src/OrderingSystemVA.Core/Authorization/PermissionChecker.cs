using Abp.Authorization;
using OrderingSystemVA.Authorization.Roles;
using OrderingSystemVA.Authorization.Users;

namespace OrderingSystemVA.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
