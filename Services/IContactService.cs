using System.Collections.Generic;

namespace phonebook.Services {
    public interface IContactService
    {
        IEnumerable<Contact> Get();
        Contact Add(Contact contact);
        Contact Update(Contact contact);
    } 
}