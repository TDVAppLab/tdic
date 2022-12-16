using System;
using System.Collections.Generic;

namespace TDIC.DTOs
{
    public partial class t_attachmentUpdateUDto
    {
        public long id_file { get; set; }
        public Guid? id_file_guid { get; set; }
        public string name { get; set; }
        public string type_data { get; set; }
        public string format_data { get; set; }
        public string itemlink { get; set; }
        public string license { get; set; }
        public string memo { get; set; }
        public bool? isActive { get; set; }
        public string target_article_id { get; set; }
    }
}
