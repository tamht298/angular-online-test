import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {Answer} from 'src/app/models/answer';
import {QuestiontypeService} from 'src/app/services/questiontype.service';
import {Question} from 'src/app/models/question';
import {QuestionType} from 'src/app/models/question_type';
import {SubjectService} from 'src/app/services/subject.service';
import {Subjects} from 'src/app/models/subjects';
import {QuestionService} from 'src/app/services/question.service';
import {Part} from 'src/app/models/part';
import { ToastrService } from 'ngx-toastr';
import { PartService } from 'src/app/services/part.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CUSTOM_LANGUAGE } from 'src/app/shared/language-options';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
 
  answer1: Answer;
  answer2: Answer;
  questionTypes: QuestionType[]=[];
  qType: any={};
  newQuestion: any = {};
  questions: Question[];
  subjects: Subjects[];
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

  constructor(
    private questionTypeService: QuestiontypeService,
    private subjectService: SubjectService, 
    private questionService: QuestionService, 
    private toastr: ToastrService,
    private partService: PartService
    
    ) {}

  ngOnInit() {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: CUSTOM_LANGUAGE
    }

    //load danh sach câu hỏi
    this.questionService.getQuestions().subscribe(data => {

      this.questions = data;
      this.dtTrigger.next();
    }, error=> console.log(error));

    //get danh sach loại câu hỏi
    this.questionTypeService.getTypes().subscribe(data => {
      this.questionTypes = data;
    });
    //get danh sách môn học
    this.loadSubjects();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  //fetch dữ liệu
  fetchData(idForm: string){
    this.questionService.getQuestions().subscribe(data=>{
      
      this.questions=data;
      
      //close modal
      this.closeModalById(idForm);
       //rerender table
       this.rerender();
      //show successful toast
      this.showSuccess('Dữ liệu đã cập nhật!', 'Thành công');
      
    },
    error=>{
      console.log(error);
      this.closeModalById(idForm);
      this.showError('Cập nhật thất bại', 'Lỗi');
    });
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
    else if(this.newQuestion.questionType.typeCode == 'MC'){}

    this.newQuestion.deleted = false;
    this.newQuestion.shuffle = this.isShuffle;
    this.newQuestion.questionAnswersList=this.newAnswers;
    this.questionService.createQuestion(this.newQuestion).subscribe(()=>{

      this.fetchData('closeAddModal');
    }, error=>{
      this.showError('Thêm câu hỏi thất bại', 'Lỗi')
      console.log(error);
    });
    
  }

  loadSubjects() {
    this.subjectService.getSubject().subscribe(data => this.subjects = data);
  }

  getPart() {
    this.partService.getPartBySubjectId(this.selectedSubject.id).subscribe(data=>this.parts=data);

  }
  getType(){
    this.qType = this.newQuestion.questionType;
    switch(this.qType.typeCode){
      case 'TF':{
        this.TF=true;
        this.MC=false; 
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
    
        console.log(this.selectedQuestion.part);
        
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
          break;
        }
          
      }
    });
    
    
  }
  deletedQuestion(){
    this.selectedQuestion.deleted=true;
    this.questionService.deleteQuestion(this.selectedQuestion).subscribe(()=>{

      this.fetchData('closeDeleteModal')
    }, error=>{
      console.log(error);  
      // this.showError('Xoá thất bại', 'Lỗi');
    })
  }
  //change option of TF type
  onChangeAnswerTF(selectedAnwserId: number){
   
    
    this.selectedAnswers.forEach(item=>{
      if(item.id===selectedAnwserId){
        item.correct=true;
      }
      else(item.correct=false)
    })
    
  }
  editQuestion(){
    this.selectedQuestion.questionAnswersList= this.selectedAnswers;
    this.questionService.updateQuestion(this.selectedQuestion).subscribe(()=>{

      this.fetchData('closeEditModal');
    }, error=>{
      console.log(error); 
    })
    
  }


}
