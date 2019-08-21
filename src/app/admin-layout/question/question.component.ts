import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { QuestiontypeService } from 'src/app/services/questiontype.service';
import { Form, NgForm } from '@angular/forms';
import { Question } from 'src/app/models/question';
import { QuestionType } from 'src/app/models/question_type';
import { SubjectService } from 'src/app/services/subject.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  answer1: Answer;
  answer2: Answer;
  questionTypes: QuestionType[];
  question: any={};
  typeQuestion: QuestionType;
  questionTypeId: number;
  public answers: any[]=[];
  constructor(private questionTypeService : QuestiontypeService, private subjectSevice: SubjectService) {
    this.answers.push(this.answer1, this.answer2);

   }

  ngOnInit() {
   this.questionTypeService.getTypes().subscribe(data=> {
     
     this.questionTypes=data;
     
   });
   
  }

  addQuestion(){
    
    //gán typeQuestion với questionTypeId vừa tìm được
    console.log(this.question.questionType);
  }

  loadSubject(){

  }


}
