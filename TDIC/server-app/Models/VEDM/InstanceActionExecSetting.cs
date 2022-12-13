using System;

#nullable disable

namespace TDIC.Models.VEDM
{
    public partial class InstanceActionExecSetting
    {
        public long id_instruct { get; set; }
        public long id_instance { get; set; }
        public Guid id_part { get; set; }
        public long no { get; set; }
        public string name { get; set;}
        public bool is_exec { get; set; }
        public long num_loop { get; set; }
        public bool is_clamp_when_finished { get; set; }
    }
}
