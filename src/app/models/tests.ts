import { Question } from 'src/app/models/question';
export class Tests{
    id: number;
    testTitle:string;
    testTime: number
    deleted: boolean;
    dateTimeTest: Date;
    questionList: Question[];
    constructor(testTitle: string, testTime: number, deleted: boolean, dateTimeTest: Date, questionList: Question[]){
        this.testTitle=testTitle;
        this.testTime=testTime;
        this.deleted=deleted;
        this.dateTimeTest=dateTimeTest;
        this.questionList=questionList
    }
}
