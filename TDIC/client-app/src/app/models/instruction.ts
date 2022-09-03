export interface Instruction {

    id_article: number;
    id_instruct: number;
    id_view: number;


    title: string;
    short_description: string;

    display_order: number;

    memo: string;

    is_automatic_camera_rotate: boolean;
    display_instance_sets: string;
}