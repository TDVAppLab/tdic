using System;
using System.Collections.Generic;

#nullable disable

namespace TDIC.Models.EDM
{
    public partial class t_instance_object
    {
        public Guid id_article { get; set; }
        public long id_instance { get; set; }
        public Guid id_part { get; set; }
        public Guid? id_part_guid { get; set; }
        public string create_user { get; set; }
        public DateTime? create_datetime { get; set; }
        public string latest_update_user { get; set; }
        public DateTime? latest_update_datetime { get; set; }
        public double pos_x { get; set; }
        public double pos_y { get; set; }
        public double pos_z { get; set; }
        public double scale { get; set; }
        public double quaternion_x { get; set; }
        public double quaternion_y { get; set; }
        public double quaternion_z { get; set; }
        public double quaternion_w { get; set; }

        public virtual t_article id_articleNavigation { get; set; }
        public virtual t_part id_partNavigation { get; set; }
    }
}