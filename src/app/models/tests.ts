import { Question } from 'src/app/models/question';
import { Classes } from './classes';
export class Tests{
    id: number;
    testTitle:string;
    testTime: number
    
    dateTimeTest: string;
    questionList: Question[];
    classeSet: Classes[];
    constructor(testTitle: string, testTime: number,  dateTimeTest: string, questionList: Question[], classeSet: Classes[]){
        this.testTitle=testTitle;
        this.testTime=testTime;
        
        this.dateTimeTest=dateTimeTest;
        this.questionList=questionList,
        this.classeSet=classeSet;
    }

    // @ts-ignore
    constructor()
}
