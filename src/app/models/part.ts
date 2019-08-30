import { Subjects } from './subjects';

export class Part{
    id: number;
    partName: string;
    deleted: boolean;
    subject: Subjects;
    constructor(partName: string, deleted: boolean, subject: Subjects){
        this.partName=partName;
        this.deleted=deleted;
        this.subject=subject;
    }
}