
namespace TDIC.DTOs
{
    public partial class t_annotationUpdateUDto
    {

        public long id_article { get; set; }
        public long id_annotation { get; set; }
        public string title { get; set; }
        public string description1 { get; set; }
        public string description2 { get; set; }
        public short status { get; set; }
        public double? pos_x { get; set; }
        public double? pos_y { get; set; }
        public double? pos_z { get; set; }
    }
}
