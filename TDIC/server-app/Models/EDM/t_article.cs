﻿using System;
using System.Collections.Generic;

#nullable disable

namespace TDIC.Models.EDM
{
    public partial class t_article
    {
        public t_article()
        {
            t_annotations = new HashSet<t_annotation>();
            t_instructions = new HashSet<t_instruction>();
            t_lights = new HashSet<t_light>();
            t_views = new HashSet<t_view>();
        }

        public long id_article { get; set; }
        public Guid? id_article_uid { get; set; }
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
        public string create_user { get; set; }
        public DateTime? create_datetime { get; set; }
        public string latest_update_user { get; set; }
        public DateTime? latest_update_datetime { get; set; }
        public long? id_attachment_for_eye_catch { get; set; }
        public string bg_color { get; set; }
        public long bg_c { get; set; }
        public double bg_h { get; set; }
        public double bg_s { get; set; }
        public double bg_l { get; set; }
        public bool? isStarrySky { get; set; }
        public virtual m_status_article statusNavigation { get; set; }
        public virtual ICollection<t_annotation> t_annotations { get; set; }
        public virtual ICollection<t_instruction> t_instructions { get; set; }
        public virtual ICollection<t_instance_object> t_instance_objects { get; set; }
        public virtual ICollection<t_light> t_lights { get; set; }
        public virtual ICollection<t_view> t_views { get; set; }
    }
}
