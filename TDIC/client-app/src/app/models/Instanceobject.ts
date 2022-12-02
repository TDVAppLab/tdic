export interface Instanceobject {

    id_article: number;
    id_instance: number;
    id_part: number;
    
    pos_x: number;
    pos_y: number;
    pos_z: number;
    scale: number;

    quaternion_x: number;
    quaternion_y: number;
    quaternion_z: number;
    quaternion_w: number;

    uuid: string | null;
}