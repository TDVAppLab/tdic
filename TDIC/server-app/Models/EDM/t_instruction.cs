﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace TDIC.Models.EDM
{
    public partial class t_instruction
    {
        public t_instruction()
        {
            t_annotation_displays = new HashSet<t_annotation_display>();
        }

        public Guid id_article { get; set; }
        public long id_instruct { get; set; }
        public int id_view { get; set; }
        public string title { get; set; }
        public string short_description { get; set; }
        public string memo { get; set; }
        public string subtitle { get; set; }
        public long display_order { get; set; }
        public bool is_automatic_camera_rotate { get; set; }
        public string display_instance_sets { get; set; }
        public string model_action_settings { get; set; }
        public string create_user { get; set; }
        public DateTime? create_datetime { get; set; }
        public string latest_update_user { get; set; }
        public DateTime? latest_update_datetime { get; set; }

        [JsonIgnore]
        public virtual t_view id_ { get; set; }
        [JsonIgnore]
        public virtual t_article id_articleNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<t_annotation_display> t_annotation_displays { get; set; }
    }
}
