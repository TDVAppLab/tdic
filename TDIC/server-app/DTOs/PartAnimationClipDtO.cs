using System.ComponentModel.DataAnnotations;

namespace TDIC.DTOs
{
    public class PartAnimationClipDtO
    {
        [Required]
        public long no { get; set; }
        [Required]
        public string name { get; set;}
    }
}