﻿using System;
using System.Collections.Generic;

#nullable disable

namespace TDIC.Models.EDM
{
    public partial class t_part_display
    {
        public long id_instruct { get; set; }
        public long id_assy { get; set; }
        public long id_inst { get; set; }
        public long id_part { get; set; }
        public string create_user { get; set; }
        public DateTime? create_datetime { get; set; }
        public string latest_update_user { get; set; }
        public DateTime? latest_update_datetime { get; set; }
    }
}
