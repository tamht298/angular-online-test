import { Subject } from './subject';

export class Part{
    id: number;
    partName: string;
    deleted: boolean;
    subject: Subject;
    constructor(partName: string, deleted: boolean, subject: Subject){
        this.partName=partName;
        this.deleted=deleted;
        this.subject=subject;
    }
}