FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/OrderingSystemVA.Web.Host/OrderingSystemVA.Web.Host.csproj", "src/OrderingSystemVA.Web.Host/"]
COPY ["src/OrderingSystemVA.Web.Core/OrderingSystemVA.Web.Core.csproj", "src/OrderingSystemVA.Web.Core/"]
COPY ["src/OrderingSystemVA.Application/OrderingSystemVA.Application.csproj", "src/OrderingSystemVA.Application/"]
COPY ["src/OrderingSystemVA.Core/OrderingSystemVA.Core.csproj", "src/OrderingSystemVA.Core/"]
COPY ["src/OrderingSystemVA.EntityFrameworkCore/OrderingSystemVA.EntityFrameworkCore.csproj", "src/OrderingSystemVA.EntityFrameworkCore/"]
WORKDIR "/src/src/OrderingSystemVA.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/OrderingSystemVA.Web.Host", "src/OrderingSystemVA.Web.Host"]
COPY ["src/OrderingSystemVA.Web.Core", "src/OrderingSystemVA.Web.Core"]
COPY ["src/OrderingSystemVA.Application", "src/OrderingSystemVA.Application"]
COPY ["src/OrderingSystemVA.Core", "src/OrderingSystemVA.Core"]
COPY ["src/OrderingSystemVA.EntityFrameworkCore", "src/OrderingSystemVA.EntityFrameworkCore"]
WORKDIR "/src/src/OrderingSystemVA.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "OrderingSystemVA.Web.Host.dll"]
