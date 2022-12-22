using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_articleUpdateUDto
    {

        public Guid id_article { get; set; }
        public long? id_assy { get; set; }
        public string title { get; set; }
        public string short_description { get; set; }
        public string long_description { get; set; }
        public string meta_description { get; set; }
        public string meta_category { get; set; }
        public short status { get; set; }
        public bool? gammaOutput { get; set; }
        public Guid? id_attachment_for_eye_catch { get; set; }
        public string bg_color { get; set; }
        public bool? isStarrySky { get; set; }
    }
}
