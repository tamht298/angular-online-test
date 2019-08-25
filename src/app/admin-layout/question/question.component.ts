import {Component, OnInit} from '@angular/core';
import {Answer} from 'src/app/models/answer';
import {QuestiontypeService} from 'src/app/services/questiontype.service';
import {Question} from 'src/app/models/question';
import {QuestionType} from 'src/app/models/question_type';
import {SubjectService} from 'src/app/services/subject.service';
import {Subject} from 'src/app/models/subject';
import {QuestionService} from 'src/app/services/question.service';
import {Part} from 'src/app/models/part';
import { ToastrService } from 'ngx-toastr';


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
  qType: any;
  newQuestion: any = {};
  questions: Question[];
  subjects: Subject[];
  selectedSubject: any = {};
  isShuffle: boolean = true;
  TF: boolean = false;
  MC: boolean = false;
  selectedAnswerTF: any;
  
  parts: Part[];
  newAnswers: any[] = [];
  tfOptions = [
    {id: 'true', value: 'Đúng'},
    {id: 'false', value: 'Sai'}
  ]

  constructor(private questionTypeService: QuestiontypeService, private subjectSevice: SubjectService, private questionService: QuestionService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.loadQuestions();
    this.questionTypeService.getTypes().subscribe(data => {

      this.questionTypes = data;

    });
    this.loadSubjects();

  }

  addQuestion() {

    if(this.newQuestion.questionType.typeCode == 'TF'){
      if(this.selectedAnswerTF==='true'){
        this.answer1 = new Answer(this.tfOptions[0].value, 1, true, false);
        this.answer2 = new Answer(this.tfOptions[1].value, 2, false, false);
  
      }
      else if(this.selectedAnswerTF === 'false'){
        this.answer1 = new Answer(this.tfOptions[0].value, 1, false, false);
        this.answer2 = new Answer(this.tfOptions[1].value, 2, true, false);
      }
      this.newAnswers.push(this.answer1, this.answer2);
    }
    else if(this.newQuestion.questionType.typeCode == 'MC'){
      
      
    }
    
    
    this.newQuestion.deleted = false;
    this.newQuestion.shuffle = this.isShuffle;
    this.newQuestion.questionAnswersList=this.newAnswers;
    
    
    this.questionService.createQuestion(this.newQuestion).subscribe(data=>{
      this.questions=data;
      this.loadQuestions();
      
      this.closeModalById('closeAddModal');
      this.showSuccess('Thêm câu hỏi thành công', 'Chúc mừng');
    }, error=>{
      this.showError('Thêm câu hỏi thất bại', 'Lỗi')
      
      console.log(error);
    });
    
  }

  loadSubjects() {
    this.subjectSevice.getSubject().subscribe(data => this.subjects = data);
  }

  getPart() {
    //get đối tượng subject là selectedSubject
    this.parts = this.selectedSubject.partList;
  }
  getType(){

    this.qType = this.newQuestion.questionType;
    switch(this.qType.typeCode){
      case 'TF':{
        this.TF=true;
        this.MC=false;
        console.log('TF');
        
        break;
      }
      case 'MC':{
        this.MC=true;
        this.TF=false;
        this.newAnswers.length=0;
        this.newAnswers.push(new Answer('', 1, false, false), new Answer('', 2, false, false));
        
        console.log(this.newAnswers);
        
        
        
        break;
      }
    }

  }

  loadQuestions() {
    this.loading = true;
    this.questionService.getQuestions().subscribe(data => {

      this.questions = data;
      this.loading = false;
    });

  }

  closeModalById(idModal: string){
    document.getElementById(idModal).click();
  }

   //define successful toast
   showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }
  //define error toast
    showError(title: string, message: string){
    this.toastr.error(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

  //xoá answer
  deletedAnswer(index: number){
    if(this.newAnswers.length>2){
      this.newAnswers.splice(index, 1);
      console.log(this.newAnswers.length)
    }
    
  }
  addFieldAnswer(){
  this.newAnswers.push(new Answer('', this.newAnswers[this.newAnswers.length-1].displayOrder+1, false, false));
  console.log(this.newAnswers.length);
  
    
  }
  getChecked(){
    //item.correct=!item.correct;
    console.log(this.newAnswers);
    
    
    
  }
}
