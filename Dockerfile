FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app
COPY . ./
RUN dotnet restore "./phonebook.csproj"
RUN dotnet publish "phonebook.csproj" -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "phonebook.dll"]
