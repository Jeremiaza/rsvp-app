using Azure;
using Azure.Data.Tables;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace Guests.Core
{
    public class GuestServices : IGuestServices
    {
        private const string TableName = "guests";
        private readonly IConfiguration _configuration;
        public GuestServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        private async Task<TableClient> GetTableClient()
        {
            var serviceClient = new TableServiceClient(_configuration["ConnectionStrings:AzureTableStorage"]);
            var tableClient = serviceClient.GetTableClient(TableName);
            await tableClient.CreateIfNotExistsAsync();
            return tableClient;
        }

        public async Task<Guest> AddGuest(string accessCode, string guestName, string? groupId)
        {
            var tableClient = await GetTableClient();
            Guest guest = new()
            {
                RowKey = (guestName[..3] + guestName[^3..]).ToLower(),
                AccessCode = accessCode,
                Name = guestName,
            };
            if (groupId != null)
            {
                guest.GroupId = groupId;
            }
            await tableClient.AddEntityAsync(guest);
            return guest;
        }

        public async Task<List<Guest>> GetGuest(string accessCode)
        {
            var tableClient = await GetTableClient();
            var id = new String(accessCode.Where(Char.IsLetter).ToArray());
            var guest = await tableClient.GetEntityAsync<Guest>("guests", id);
            if (guest == null || !BCrypt.Net.BCrypt.Verify(accessCode, guest.Value.AccessCode))
            {
                throw new HttpRequestException($"Access code is incorrect or guest not found", null, HttpStatusCode.Unauthorized);
            }
            if (guest.Value.GroupId != null)
            {
                var groupId = guest.Value.GroupId;
                var guests = tableClient.Query<Guest>()
                .Where(x => x.GroupId == groupId)
                .Take(1200)
                .ToList();
                
                return guests;
            }

            return new List<Guest>() { guest.Value };
        }

        public async Task<Guest> UpdateGuest(Guest guest)
        {
            Guest updatedGuest = guest;
            updatedGuest.Answered = true;
            var tableClient = await GetTableClient();
            await tableClient.UpsertEntityAsync(updatedGuest);
            return updatedGuest;
        }

    }
}