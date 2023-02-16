using System;

namespace TDIC.DTOs
{
    public class t_articleScreenInfoUpdateDto
    {
        public Guid id_article {get; set;}
        public int outputEncoding { get; set; }
        public int toneMapping { get; set; }
        public double exposure { get; set; }
        public string environment { get; set; }
        public string bg_color { get; set; }
        
    }
}



