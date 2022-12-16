using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_partUpdateUDto
    {

        public Guid id_part { get; set; }
        public string part_number { get; set; }
        public int version { get; set; }
        public string format_data { get; set; }
        public string type_texture { get; set; }
        public string itemlink { get; set; }
        public string license { get; set; }
        public string author { get; set; }
        public string memo { get; set; }
    }
}
