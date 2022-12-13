using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_partListDto
    {
        public string id_part { get; set; }
        public string part_number { get; set; }
        public int version { get; set; }
        public string type_data { get; set; }
        public string format_data { get; set; }
        public string file_name { get; set; }
        public long? file_length { get; set; }
        public string itemlink { get; set; }
        public string license { get; set; }
        public string author { get; set; }
        public string memo { get; set; }
        public string create_user { get; set; }
        public DateTime? create_datetime { get; set; }
        public string latest_update_user { get; set; }
        public DateTime? latest_update_datetime { get; set; }
        public long count_use_instance { get; set; }
        public virtual IEnumerable<article_reference> article_references { get; set; }
    }

    
    public partial class article_reference
    {
        public Guid id_article { get; set; }
        public string title { get; set; }
        public string status_name { get; set; }
    }
}