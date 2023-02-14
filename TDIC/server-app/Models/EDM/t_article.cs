using System;
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

        public Guid id_article { get; set; }
        public long? id_assy { get; set; }
        public string title { get; set; }
        public string short_description { get; set; }
        public string long_description { get; set; }
        public string meta_description { get; set; }
        public string meta_category { get; set; }
        public short status { get; set; }
        public bool? gammaOutput { get; set; }
        public int outputEncoding { get; set; }
        public int toneMapping { get; set; }
        public double exposure { get; set; }
        public string environment { get; set; }
        public string create_user { get; set; }
        public DateTime? create_datetime { get; set; }
        public string latest_update_user { get; set; }
        public DateTime? latest_update_datetime { get; set; }
        public Guid? id_attachment_for_eye_catch { get; set; }
        public string bg_color { get; set; }
        public bool? isStarrySky { get; set; }
        public virtual m_status_article statusNavigation { get; set; }
        public virtual ICollection<t_annotation> t_annotations { get; set; }
        public virtual ICollection<t_instruction> t_instructions { get; set; }
        public virtual ICollection<t_instance_object> t_instance_objects { get; set; }
        public virtual ICollection<t_light> t_lights { get; set; }
        public virtual ICollection<t_view> t_views { get; set; }
    }
}
