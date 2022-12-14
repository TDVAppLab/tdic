export interface Modelfile {

    id_part: string;
    part_number: string;
    version: number;
    type_data: string;
    format_data: string;
    file_name: string;
    file_length: number;
    itemlink: string;
    license: string;
    author: string;
    memo: string;
    create_datetime: Date | null;
    latest_update_datetime: Date | null;
    count_use_instance: number;
    article_references : article_reference[];
}


export interface article_reference
{
    id_article: number;
    title: string;
    status_name: string;
}

export interface ModelfileUploadDtO {

    id_part: string;
    part_number: string;
    version: number;
    file_data: File;
    type_data: string;
    format_data: string;
    file_name: string;
    file_length: number;
    itemlink: string;
    license: string;
    author: string;
    memo: string;
    create_datetime: Date | null;
    latest_update_datetime: Date | null;
}