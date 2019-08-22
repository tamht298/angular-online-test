import {Component, OnInit} from '@angular/core';
import {Answer} from 'src/app/models/answer';
import {QuestiontypeService} from 'src/app/services/questiontype.service';
import {Question} from 'src/app/models/question';
import {QuestionType} from 'src/app/models/question_type';
import {SubjectService} from 'src/app/services/subject.service';
import {Subject} from 'src/app/models/subject';
import {QuestionService} from 'src/app/services/question.service';
import {Part} from 'src/app/models/part';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  loading = false;
  answer1: Answer;
  answer2: Answer;
  questionTypes: QuestionType[];
  question: any = {};
  questions: Question[];
  typeQuestion: QuestionType;
  questionTypeId: number;
  subjects: Subject[];
  selectedSubject: any = {};
  parts: Part[];
  public answers: any[] = [];

  constructor(private questionTypeService: QuestiontypeService, private subjectSevice: SubjectService, private questionService: QuestionService) {
    this.answers.push(this.answer1, this.answer2);

  }

  ngOnInit() {
    this.loadQuestions();
    this.questionTypeService.getTypes().subscribe(data => {

      this.questionTypes = data;

    });
    this.loadSubjects();

  }

  addQuestion() {

    //gán typeQuestion với questionTypeId vừa tìm được
    console.log(this.question.questionType);
  }

  loadSubjects() {
    this.subjectSevice.getSubject().subscribe(data => this.subjects = data);
  }

  getPart() {

    //get đối tượng subject là selectedSubject
    this.parts = this.selectedSubject.partList;


  }

  loadQuestions() {
    this.loading = true;
    this.questionService.getQuestions().subscribe(data => {

      this.questions = data;
      this.loading = false;
    });

  }


}
