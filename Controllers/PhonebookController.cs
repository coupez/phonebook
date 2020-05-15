using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using phonebook.Models;
using phonebook.Services;

namespace phonebook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhonebookController : ControllerBase
    {
        private readonly IContactService contactService;

        public PhonebookController(IContactService contactService) {
            this.contactService = contactService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Contact>> Get(string query)
        {
            return Ok(contactService.Get(query));
        }

        [HttpPost]
        public ActionResult<Contact> Create(ContactDTO contact) {
            return contactService.Add(contact.ToContact());
        }
    }
}