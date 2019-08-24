export class Answer{
    id: number;
    correct: boolean;
    answerContent: string;
    displayOrder: number;
    deleted: boolean;
    constructor(answerContent: string, displayOrder: number, correct: boolean, deleted: boolean){
        this.answerContent=answerContent;
        this.displayOrder=displayOrder;
        this.correct=correct;
        this.deleted=deleted;
    }
    
}