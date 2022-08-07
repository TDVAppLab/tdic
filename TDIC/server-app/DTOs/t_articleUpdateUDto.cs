using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_articleUpdateUDto
    {

        public long id_article { get; set; }
        public long? id_assy { get; set; }
        public string title { get; set; }
        public string short_description { get; set; }
        public string long_description { get; set; }
        public string meta_description { get; set; }
        public string meta_category { get; set; }
        public short status { get; set; }
        public int? directional_light_color { get; set; }
        public double? directional_light_intensity { get; set; }
        public double? directional_light_px { get; set; }
        public double? directional_light_py { get; set; }
        public double? directional_light_pz { get; set; }
        public int? ambient_light_color { get; set; }
        public double? ambient_light_intensity { get; set; }
        public bool? gammaOutput { get; set; }
        public long? id_attachment_for_eye_catch { get; set; }
        public long bg_c { get; set; }
        public double bg_h { get; set; }
        public double bg_s { get; set; }
        public double bg_l { get; set; }
        public bool? isStarrySky { get; set; }
    }
}
