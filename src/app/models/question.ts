import { Answer } from './answer';
import { Part } from './part';
import { QuestionType } from './question_type';

export class Question{
    constructor(id: number, questionContent: string, point: number, difficultyLevel: number,  questionType: QuestionType, questionAnswerList: Answer[], deleted: boolean, part: Part, shuffle: boolean){

    }
}