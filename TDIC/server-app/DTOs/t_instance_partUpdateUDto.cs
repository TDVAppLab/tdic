using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_instance_partUpdateUDto
    {
        public long id_assy { get; set; }
        public long id_inst { get; set; }
        public long id_part { get; set; }
        public double pos_x { get; set; }
        public double pos_y { get; set; }
        public double pos_z { get; set; }
        public double scale { get; set; }

    }
}
