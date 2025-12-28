
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

export type State<T> = 
    {
        stateType: 'error';
        message: string;
        data:null

    }|
    {
        stateType: 'success';
        data: T;
    };


    export type  projectsListViewType = {
        id: string
        title: string;
        link: string;
        technologies: string[];
        files: FileX & { 
            id: string
        }| undefined
    }