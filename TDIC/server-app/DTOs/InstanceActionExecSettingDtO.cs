namespace TDIC.DTOs
{
    public partial class InstanceActionExecSettingDtO
    {
        public long id_instruct { get; set; }
        public long id_instance { get; set; }
        public long id_part { get; set; }
        public long no { get; set; }
        public string name { get; set;}
        public bool is_exec { get; set; }
        public long num_loop { get; set; }
        public bool is_clamp_when_finished { get; set; }
    }
}
