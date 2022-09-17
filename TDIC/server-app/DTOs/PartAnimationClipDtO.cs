using System.ComponentModel.DataAnnotations;

namespace TDIC.DTOs
{
    public class PartAnimationClipDtO
    {
        [Required]
        public long No { get; set; }
        [Required]
        public string name { get; set;}
    }
}