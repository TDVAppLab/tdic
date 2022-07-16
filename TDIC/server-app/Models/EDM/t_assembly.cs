﻿using System;
using System.Collections.Generic;

#nullable disable

namespace TDIC.Models.EDM
{
    public partial class t_assembly
    {
        public t_assembly()
        {
            t_articles = new HashSet<t_article>();
            t_instance_parts = new HashSet<t_instance_part>();
        }

        public long id_assy { get; set; }
        public string assy_name { get; set; }
        public string create_user { get; set; }
        public DateTime? create_datetime { get; set; }
        public string latest_update_user { get; set; }
        public DateTime? latest_update_datetime { get; set; }

        public virtual ICollection<t_article> t_articles { get; set; }
        public virtual ICollection<t_instance_part> t_instance_parts { get; set; }
    }
}
