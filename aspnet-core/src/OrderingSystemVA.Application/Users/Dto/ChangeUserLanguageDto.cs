using System.ComponentModel.DataAnnotations;

namespace OrderingSystemVA.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}