import { Request } from 'express';

export interface User {
    pin: string,
    expire: Date,
    emailRemaining?: number,
    timeExtRemaining?: number,
    files?: FileType[],
}

export interface FileType {
    id: string;
    name: string;
    ext: string;
    size: string;
    url: string;
}

export interface NewRequestType extends Request {
    user?: User;
    fileId?: string;
}