import { FileX } from "./type";


function FileToBase64(params:File):Promise<FileX> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(params);
        reader.onload = () => {
            const fileX:FileX = {
                type: params.type.startsWith('image/') ? 'image' : params.type.startsWith('video/') ? 'video' :
                      params.type.startsWith('audio/') ? 'audio' :
                      params.type === 'application/pdf' ? 'document' : 'other',
                name: params.name,
                size: params.size,  
                link: reader.result as string,
                createdAt: params.lastModified ? new Date(params.lastModified) : new Date(),
                updatedAt: new Date(),
                tags: [],
                path: ''
            }
            resolve(fileX);
        };
        reader.onerror = error => reject(error);
    });
    
}
export async function File_To_FileXList(params:File[]){
    return Promise.all(params.map(file => FileToBase64(file)));  
}
export function FileX_To_Blub(FileList:FileX[]):FileX[][] {
    let result:FileX[][] = [];
    let temp:FileX[] = [];
    let maxTemp = 3;
    FileList.forEach((file, index) => {
        temp.push(file);
        if (temp.length === maxTemp || index === FileList.length - 1) {
            result.push(temp);
            temp = [];
        }
    });
    return result;
    
}