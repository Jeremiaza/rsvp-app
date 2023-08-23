
namespace Guests.Core
{
    public interface IGuestServices
    {
        Task<List<Guest>> GetGuest(string accessCode);
        Task<Guest> AddGuest(string accessCode, string guestName, string? groupId);
        Task<Guest> UpdateGuest(Guest guest);
    }
}
