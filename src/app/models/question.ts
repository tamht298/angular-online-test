import { Answer } from './answer';
import { Part } from './part';
import { QuestionType } from './question_type';

export class Question{
    id: number;
    questionContent: string;
    point: number;
    difficultyLevel: number;
    questionType: QuestionType;
    questionAnswerList: Answer[];
    deleted: boolean;
    part: Part;
    shuffle: boolean;
    constructor(questionContent: string, point: number, difficultyLevel: number,  questionType: QuestionType, questionAnswerList: Answer[], deleted: boolean, part: Part, shuffle: boolean){
        this.questionContent=questionContent;
        this.point=point;
        this.difficultyLevel=difficultyLevel;
        this.questionType=questionType;
        this.questionAnswerList=questionAnswerList;
        this.deleted=deleted;
        this.part=part;
        this.shuffle=shuffle;
        
    }
}