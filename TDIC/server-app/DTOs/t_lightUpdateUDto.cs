using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_lightUpdateUDto
    {
        public string id_article { get; set; }
        public long id_light { get; set; }
        public string light_type { get; set; }
        public string title { get; set; }
        public string short_description { get; set; }
        public long? color { get; set; }
        public double? intensity { get; set; }
        public double? px { get; set; }
        public double? py { get; set; }
        public double? pz { get; set; }
        public double? distance { get; set; }
        public double? decay { get; set; }
        public double? power { get; set; }
        public double? shadow { get; set; }
        public double? tx { get; set; }
        public double? ty { get; set; }
        public double? tz { get; set; }
        public long? skycolor { get; set; }
        public long? groundcolor { get; set; }
        public bool is_lensflare { get; set; }
        public double? lfsize { get; set; }
        public byte[] file_data { get; set; }
    }
}
