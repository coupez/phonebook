using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using MongoDB.Bson;
using MongoDB.Driver;
using phonebook.Models;

namespace phonebook.Services
{
    public class ContactService : IContactService
    {
        private readonly IMongoCollection<Contact> _contacts;

        public ContactService(IPhonebookDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _contacts = database.GetCollection<Contact>(settings.ContactsCollectionName);


            _contacts.Indexes.CreateOne(new CreateIndexModel<Contact>(
                Builders<Contact>.IndexKeys.Text(c => c.FirstName).Text(c => c.LastName).Text(c => c.PhoneNumber)
            // Builders<Contact>.IndexKeys.Text(c => $"{nameof(Contact).nameof(c.FirstName)} + {nameof(c.LastName)}")
            ));
        }

        public Contact Add(Contact contact)
        {
            _contacts.InsertOne(contact);
            return GetById(contact.Id);
        }

        public IEnumerable<Contact> Get(string query)
        {
            // Try a faster search on text index first
            var options = new TextSearchOptions { CaseSensitive = false, DiacriticSensitive = false };
            var indexQuery = Builders<Contact>.Filter.Text(query, options);
            var indexResult = _contacts.Find(indexQuery);

            if (indexResult.Any())
            {
                return indexResult.ToList();
            }

            // If that produces no results, search more precise instead
            return _contacts.Find(queryFilter(query)).ToList();
        }

        public Contact Update(Contact contact)
        {
            _contacts.ReplaceOne(c => c.Id == contact.Id, contact);
            return GetById(contact.Id);
        }

        public Contact GetById(string id)
        {
            return _contacts.Find(c => c.Id == id).FirstOrDefault();
        }

        static private FilterDefinition<Contact> queryFilter(string query)
        {
            var builder = Builders<Contact>.Filter;
            var regex = new BsonRegularExpression($".*{Regex.Escape(query)}.*", "i");
            var filter = builder.Regex(c => c.FirstName, regex) | builder.Regex(c => c.LastName, regex);

            // allow spaces between numbers
            var phoneQuery = string.Join(" ?", query.ToCharArray().Select(c => Regex.Escape(c.ToString())));
            return filter | builder.Regex(c => c.PhoneNumber, $".*{phoneQuery}.*");
        }
    }
}