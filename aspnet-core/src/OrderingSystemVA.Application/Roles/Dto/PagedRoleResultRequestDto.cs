using Abp.Application.Services.Dto;

namespace OrderingSystemVA.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

