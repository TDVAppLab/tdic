using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_viewUpdateUDto
    {

        public Guid id_article { get; set; }
        public int id_view { get; set; }
        public string title { get; set; }
        public double? cam_pos_x { get; set; }
        public double? cam_pos_y { get; set; }
        public double? cam_pos_z { get; set; }
        public double? cam_lookat_x { get; set; }
        public double? cam_lookat_y { get; set; }
        public double? cam_lookat_z { get; set; }
        public double? cam_quat_x { get; set; }
        public double? cam_quat_y { get; set; }
        public double? cam_quat_z { get; set; }
        public double? cam_quat_w { get; set; }
        public double? obt_target_x { get; set; }
        public double? obt_target_y { get; set; }
        public double? obt_target_z { get; set; }
    }
}
