namespace phonebook.Models
{
    public class PhonebookDatabaseSettings : IPhonebookDatabaseSettings
    {
        public string ContactsCollectionName { get; set; }
        public string DatabaseName { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string ConnectionString
        {
            get
            {
                if (string.IsNullOrEmpty(User) || string.IsNullOrEmpty(Password))
                {
                    return $@"mongodb://{Host}:{Port}";
                }

                return $@"mongodb://{User}:{Password}@{Host}:{Port}";
            }
        }
    }

    public interface IPhonebookDatabaseSettings
    {
        string ContactsCollectionName { get; }
        string ConnectionString { get; }
        string DatabaseName { get; }
        string Host { get; set; }
        int Port { get; set; }
        string User { get; set; }
        string Password { get; set; }
    }
}