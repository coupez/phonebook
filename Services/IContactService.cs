using System.Collections.Generic;
using phonebook.Models;

namespace phonebook.Services {
    public interface IContactService
    {
        IEnumerable<Contact> Get(string query);
        Contact GetById(string id);
        Contact Add(Contact contact);
        Contact Update(Contact contact);
    } 
}