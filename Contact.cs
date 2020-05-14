using System;
using System.ComponentModel.DataAnnotations;

namespace phonebook
{
    public class Contact
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        [RegularExpression(@"(\+\d* \d* \d{6,})", ErrorMessage = "Please use a format like '+39 02 1234567'")]
        public string Phonenumber {get;set;}
    }
}
