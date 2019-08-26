export class QuestionType{
    id: number;
    typeCode: string;
    name: string;
    deleted: boolean;
    constructor(typeCode: string, name: string, deleted: boolean){
        this.typeCode=typeCode;
        this.name=name;
        this.deleted=deleted;
    }
}