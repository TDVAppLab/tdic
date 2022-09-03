using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_instructionUpdateUDto
    {

        public long id_article { get; set; }
        public long id_instruct { get; set; }
        public int id_view { get; set; }
        public string title { get; set; }
        public string short_description { get; set; }
        public string memo { get; set; }
        public long display_order { get; set; }
        public bool is_automatic_camera_rotate { get; set; }
        public string display_instance_sets { get; set; }
    }
}
