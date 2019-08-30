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
import { PartService } from 'src/app/services/part.service';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  loading = false;
  answer1: Answer;
  answer2: Answer;
  questionTypes: QuestionType[]=[];
  qType: any={};
  newQuestion: any = {};
  questions: Question[]=[];
  subjects: Subject[];
  selectedSubject: any = {};
  isShuffle: boolean = true;
  TF: boolean = false;
  MC: boolean = false;
  selectedAnswerTF: any;
  selectedQuestion: any={};
  selectedCorrectAnswerId: number=-1;
  selectedTypeId: number=-1;
  selectedPartId: number=-1;
  parts: Part[];
  newAnswers: any[] = [];
  selectedAnswers: Answer[]=[];
  tfOptions = [
    {id: 'true', value: 'Đúng'},
    {id: 'false', value: 'Sai'}
  ];
  p: Number = 1;
  count: Number = 2;

  constructor(
    private questionTypeService: QuestiontypeService,
    private subjectService: SubjectService, 
    private questionService: QuestionService, 
    private toastr: ToastrService,
    private partService: PartService
    
    ) {}

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
      this.showSuccess('Thêm câu hỏi thành công', 'Hoàn thành');
    }, error=>{
      this.showError('Thêm câu hỏi thất bại', 'Lỗi')
      
      console.log(error);
    });
    
  }

  loadSubjects() {
    this.subjectService.getSubject().subscribe(data => this.subjects = data);
  }

  getPart() {
    //get đối tượng subject là selectedSubject
    console.log(this.selectedSubject.subjectName);
    
    this.partService.getPartBySubjectId(this.selectedSubject.id).subscribe(data=>this.parts=data);

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

        break;
      }
    }

  }

  loadQuestions() {
    this.loading = true;
    this.questionService.getQuestions().subscribe(data => {

      this.questions = data.filter(item=>item.deleted===false);
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
  removeAnswer(index: number){
    if(this.selectedAnswers.length>2){
      this.selectedAnswers.splice(index, 1);
      console.log(this.selectedAnswers.length)
    }
  }

  addFieldAnswer(answer: any){
    answer.push(new Answer('', answer[answer.length-1].displayOrder+1, false, false));
  }
  getEditType(){
    console.log(this.selectedTypeId);
    this.questionTypeService.getTypeById(this.selectedTypeId).subscribe(data=>{
      this.selectedQuestion.questionType=data;
      switch(this.selectedQuestion.questionType.typeCode){
        case 'TF':{
          this.TF=true;
          this.MC=false;

          break;
        }
        case 'MC':{
          this.MC=true;
          this.TF=false;     
          this.selectedAnswers=this.selectedQuestion.questionAnswersList;
          
          
          // this.selectedAnswers.length=0;
          // this.selectedAnswers.push(new Answer('', 1, false, false), new Answer('', 2, false, false));
           
          break;
        }
          
      }
    })
    
  }
  getSelected(id: number){

    this.questionService.getQuestionById(id).subscribe(data=>{
      this.selectedQuestion=data;
      this.selectedTypeId=this.selectedQuestion.questionType.id;
      this.selectedAnswers=this.selectedQuestion.questionAnswersList; 
      this.selectedPartId=this.selectedQuestion.part.id;
      
      
      this.selectedCorrectAnswerId=this.findCorrectAnswerId(this.selectedAnswers);
      console.log(this.findCorrectAnswerId(this.selectedAnswers));
      this.partService.getPartBySubjectId(this.selectedQuestion.part.subject.id).subscribe(data=>{
        this.parts=data;
        this.selectedSubject=this.selectedQuestion.part.subject;
        
      });
 
      switch(this.selectedQuestion.questionType.typeCode){
        case 'TF':{
          this.TF=true;
          this.MC=false;
          
          
          break;
        }
        case 'MC':{
          this.MC=true;
          this.TF=false;     
          
          //this.selectedAnswers=this.selectedQuestion.questionAnswerList;  
          break;
        }
          
      }
    });
    
    
  }
  deletedQuestion(){
    this.selectedQuestion.deleted=true;
    this.questionService.deleteQuestion(this.selectedQuestion).subscribe(()=>{
      
      this.loadQuestions();
      this.closeModalById('closeDeleteModal');
      this.showSuccess('Xoá thành công', 'Hoàn thành');
    }, error=>{
      console.log(error);  
      this.showError('Xoá thất bại', 'Lỗi');
    })
  }
  editQuestion(f: object){
    console.log(f);
    this.selectedQuestion.questionAnswersList= this.selectedAnswers;
    this.questionService.updateQuestion(this.selectedQuestion).subscribe(()=>{
      this.loadQuestions();
      this.closeModalById('closeEditModal');
      this.showSuccess('Cập nhật thành công', 'Hoàn thành');
    }, error=>{
      console.log(error);     
      this.showError('Cập nhật thất bại', 'Lỗi');
    })
    
  }
  findCorrectAnswerId(array: any[]): number{
    let id: number=-1;
    array.forEach(item=>{
      if(item.correct){
        id=item.id;
        
      }
    })
    return id;
    
  }

}
