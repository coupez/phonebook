

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using phonebook.Services;

namespace phonebook.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PhonebookController : ControllerBase
    {
        private readonly IContactService contactService;

        public PhonebookController(IContactService contactService) {
            this.contactService = contactService;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return contactService.Get();
        }
    }
}