using Guests.Core;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuestController : ControllerBase
    {
        private readonly IGuestServices _guestServices;

        public GuestController(IGuestServices guestServices)
        {
            _guestServices = guestServices ?? throw new ArgumentNullException(nameof(guestServices));
        }

        [HttpGet]
        public IActionResult Get([FromQuery] string accessCode)
        {
            return Ok(_guestServices.GetGuest(accessCode).Result);
        }

        /// <summary>
        /// Create a guest to the database
        /// </summary>
        /// <param name="accessCode">MUST BEGIN WITH THE FIRST 3 LETTERS AND LAST 3 LETTERS OF THE FULL NAME!</param>
        /// <param name="guestName">Name of the guest</param>
        /// <param name="groupId">For multi guest rsvp invite, set this unique value for all guests you want in the same invite</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Add([FromQuery] string accessCode, [FromQuery] string guestName, [FromQuery] string? groupId)
        {
            return Ok(_guestServices.AddGuest(BCrypt.Net.BCrypt.HashPassword(accessCode), guestName, groupId).Result);
        }

        [HttpPut]
        public IActionResult Update(Guest guest)
        {
            return Ok(_guestServices.UpdateGuest(guest).Result);
        }
    }
}