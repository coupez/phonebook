namespace phonebook.Models
{
    public class PhonebookDatabaseSettings : IPhonebookDatabaseSettings
    {
        public string ContactsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IPhonebookDatabaseSettings
    {
        string ContactsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
