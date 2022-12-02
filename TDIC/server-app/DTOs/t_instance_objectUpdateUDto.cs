using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_instance_objectUpdateUDto
    {
        public long id_article { get; set; }
        public long id_instance { get; set; }
        public long id_part { get; set; }
        public double pos_x { get; set; }
        public double pos_y { get; set; }
        public double pos_z { get; set; }
        public double scale { get; set; }
        public double quaternion_x { get; set; }
        public double quaternion_y { get; set; }
        public double quaternion_z { get; set; }
        public double quaternion_w { get; set; }

    }
}
