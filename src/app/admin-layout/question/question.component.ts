import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { QuestiontypeService } from 'src/app/services/questiontype.service';
import { Form, NgForm } from '@angular/forms';
import { Question } from 'src/app/models/question';
import { QuestionType } from 'src/app/models/question_type';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/models/subject';


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
  subjects: Subject[];
  public answers: any[]=[];
  constructor(private questionTypeService : QuestiontypeService, private subjectSevice: SubjectService) {
    this.answers.push(this.answer1, this.answer2);

   }

  ngOnInit() {
   this.questionTypeService.getTypes().subscribe(data=> {
     
     this.questionTypes=data;
     
   });
   this.loadSubject();
   
  }

  addQuestion(){
    
    //gán typeQuestion với questionTypeId vừa tìm được
    console.log(this.question.questionType);
  }

  loadSubject(){
    this.subjectSevice.getSubject().subscribe(data=>this.subjects=data);
  }
  getPart(subject: Subject){
    console.log(subject);
  }


}
