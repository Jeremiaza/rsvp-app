using Azure;
using Azure.Data.Tables;

namespace Guests.Core
{
    public class Guest : ITableEntity
    {
        public string RowKey { get; set; } // Id
        public string? GroupId { get; set; }
        public string AccessCode { get; set; }
        public string Name { get; set; }
        public bool Accepted { get; set; } = false;
        public bool Answered { get; set; } = false;
        public string PartitionKey { get; set; } = "guests";
        public string MainCourse { get; set; } = "meat";
        public bool Diet_Glutein { get; set; } = false;
        public bool Diet_Lactose { get; set; } = false;
        public bool Diet_Peanut { get; set; } = false;
        public string Diet_Other { get; set; } = "";
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }
}
