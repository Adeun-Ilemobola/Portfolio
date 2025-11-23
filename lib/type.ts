
export type FileX = {
    type:'image' | 'video' | 'document' | 'audio' | 'other';
    name : string;
    size : number;
    path : string;
    createdAt : Date;
    updatedAt : Date;
    tags : string[];
    link: string;
}