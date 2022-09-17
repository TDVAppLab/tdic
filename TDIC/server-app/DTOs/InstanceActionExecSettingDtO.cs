namespace TDIC.DTOs
{
    public partial class InstanceActionExecSettingDtO
    {
        public long id_assy { get; set; }
        public long id_inst { get; set; }
        public long id_part { get; set; }
        public long no { get; set; }
        public string name { get; set;}
        public bool is_exec { get; set; }
        public long num_loop { get; set; }
        public bool is_clamp_when_finished { get; set; }
    }
}
