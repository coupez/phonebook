using System;
using System.Collections.Generic;

namespace phonebook.Services
{
    public class ContactService : IContactService
    {
        List<Contact> _contacts = new List<Contact> {
            new Contact {
                Id = Guid.NewGuid(),
                FirstName = "Lucas",
                LastName = "Coupez",
                Phonenumber = "+32 04 97379137"
            },
            new Contact {
                Id = Guid.NewGuid(),
                FirstName = "Gabriela",
                LastName = "Alvarez",
                Phonenumber = "+506 06 123456"
            }
        };

        public Contact Add(Contact contact)
        {
            contact.Id = Guid.NewGuid();
            _contacts.Add(contact);
            return contact;
        }

        public IEnumerable<Contact> Get()
        {
            return _contacts;
        }

        public Contact Update(Contact contact)
        {
            var index = _contacts.FindIndex(c => c.Id == contact.Id);
            _contacts[index] = contact;
            return contact;
        }
    }
}