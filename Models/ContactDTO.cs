using System.ComponentModel.DataAnnotations;

namespace phonebook.Models
{
    public class ContactDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [RegularExpression(@"(\+\d* \d* \d{6,})", ErrorMessage = "Please use a format like '+39 02 1234567'")]
        public string PhoneNumber {get;set;}

        public Contact ToContact() {
            return new Contact {
                Id = Id,
                FirstName = FirstName,
                LastName = LastName,
                PhoneNumber = PhoneNumber,
            };
        }
    }
}
