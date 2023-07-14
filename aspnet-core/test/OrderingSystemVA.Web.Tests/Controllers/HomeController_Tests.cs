using System.Threading.Tasks;
using OrderingSystemVA.Models.TokenAuth;
using OrderingSystemVA.Web.Controllers;
using Shouldly;
using Xunit;

namespace OrderingSystemVA.Web.Tests.Controllers
{
    public class HomeController_Tests: OrderingSystemVAWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}