# phonebook
A demo application using .NET and React

## running the application with docker

```
git clone https://github.com/coupez/phonebook
cd phonebook
docker-compose up -d
```

The application will be running at `http://localhost:5000` with a fresh empty database.

## running the application locally for development

Make sure you have the required dependencies installed:
```
MongoDB
.NET Core 3
Node.js
```
Spin up a mongodb database and configure your environment in `appsettings.Development.json`. After that you can run the application:

```
dotnet restore
dotnet run
```
