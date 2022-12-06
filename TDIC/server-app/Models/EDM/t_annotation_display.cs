﻿using System;
using System.Collections.Generic;

#nullable disable

namespace TDIC.Models.EDM
{
    public partial class t_annotation_display
    {
        public Guid id_article { get; set; }
        public Guid? id_article_uid { get; set; }
        public long id_instruct { get; set; }
        public long id_annotation { get; set; }
        public bool is_display { get; set; }
        public bool is_display_description { get; set; }
        public string create_user { get; set; }
        public DateTime? create_datetime { get; set; }
        public string latest_update_user { get; set; }
        public DateTime? latest_update_datetime { get; set; }

        public virtual t_instruction id_ { get; set; }
        public virtual t_annotation id_a { get; set; }
    }
}
