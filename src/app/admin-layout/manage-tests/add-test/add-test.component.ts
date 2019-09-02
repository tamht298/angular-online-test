import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionType } from 'src/app/models/question_type';
import { SubjectService } from 'src/app/services/subject.service';
import { Subjects } from '../../../models/subjects';
import { PartService } from 'src/app/services/part.service';
import { Question } from 'src/app/models/question';
import { Tests } from 'src/app/models/tests';
import { ClassesService } from '../../../services/classes.service';
import { Classes } from '../../../models/classes';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {

  listTest: any=[];
  questionList: any=[];
  loading: boolean=false;
  selectedQuestion: any={};
  selectedPart: any={};
  selectedSubject: any={};
  selectedAnswers: any=[];
  selectedType: any={};
  subjects: Subjects[]=[];
  parts: any=[];
  selectedSubjectTest: any={};
  selectedPartTest: any;
  newTest: Tests = new Tests();
  classes: Classes[]=[];
  arrClass: string='';
  classSelected: Classes[] = [];
  searchText: string='';
  totalScore: number=0;
  constructor(private testService: TestsService, 
    private questionService: QuestionService,
    private subjectService: SubjectService,
    private partService: PartService,
    private classesService: ClassesService,
    private router: Router,
    private toastr: ToastrService ) { }

  ngOnInit() {
    this.loadQuestion();
    this.loadSubjects();
    this.loadClasses();
  }

  loadQuestion(){
    this.questionService.getQuestions().subscribe(data=>{
      this.questionList=data.filter(item=>!item.deleted);
    })
  }

  loadSubjects() {
    this.subjectService.getSubject().subscribe(data => {
      this.subjects = data;
    });
  }


  //lấy đối tượng câu hỏi được chọn qua id
  getSelectedQuestion(id: number){

    this.questionService.getQuestionById(id).subscribe(data=>{
      this.selectedQuestion=data;
      this.selectedPart=data.part;
      this.selectedSubject=this.selectedPart.subject;
      this.selectedAnswers=this.selectedQuestion.questionAnswersList;
      this.selectedType=this.selectedQuestion.questionType;  
    })
  }

  //lấy part theo subject được chọn (selectedSubject)
  getPart(){
    
    this.partService.getPartBySubjectId(this.selectedSubjectTest.id).subscribe(data=>{
      this.parts=data;
      this.selectedPartTest='';
    });
  }
  //thêm câu hỏi vào bài test
  addTestList(q: Question){
    let index = this.questionList.findIndex(item=>item.id===q.id);
    if(this.totalScore+q.point>100){
      this.showError('Điểm số vượt quá 100', 'Lỗi');
    }
    else{
      this.questionList.splice(index, 1);
      this.listTest.push(q);
      this.totalScore+=q.point;
    }
    
    
  }

  //xoá câu hỏi bài test
  removeTestList(q: Question){
    let index = this.listTest.findIndex(item=>item.id===q.id);  
    this.listTest.splice(index, 1);
    this.questionList.push(q);
    this.totalScore-=q.point;
  }

  //tạo bài test
  createTest(f: NgForm){
    this.newTest.questionList=this.listTest;
    this.newTest.classeSet=this.classSelected;
    let date=this.newTest.dateTimeTest.replace('T', ' ') + ':00';
    this.newTest.dateTimeTest=date;
    if(this.totalScore==100){
      this.testService.createTest(this.newTest).subscribe(()=>{
        this.showSuccess('Dữ liệu đã cập nhật!', 'Thành công');
        this.totalScore=0;
         f.reset();
      }, error=>{
        console.log(error);
        
        this.showError('Cập nhật thất bại', 'Lỗi');
      })
    }
    else{
      this.showError('Tổng điểm chưa đạt 100đ', 'Lỗi');
    }
      
  }

  //load dữ liệu của lớp
  loadClasses(){
    this.classesService.getClasses().subscribe(data=>{
      this.classes=data;
    })
  }
  onChange(c: Classes, isChecked: boolean){
    if(isChecked){
      this.classSelected.push(c)
    }
    else{
      let index = this.classSelected.indexOf(c);
      this.classSelected.splice(index, 1);
    }

  }

  //Lấy danh sách lớp được chọn đổ lên text area
  onClassSelected(){
    let className=[];
    
    this.classSelected.forEach(item=>{
      className.push(item.className);
    })
    this.arrClass=className.join(', ');
    this.closeModalById('closeAddModal');
  }

  getQuestionsByPartId(){
    this.partService.getQuestionsByPartId(this.selectedPartTest.id).subscribe(data=>{
      this.questionList=data.filter(item=>item.deleted===false);
      
    })
  }
  //gọi nút đóng 
  closeModalById(id: string){
    document.getElementById(id).click();
  }

  onBack(url: string){
    this.router.navigateByUrl(url);
  }
    //define successful toast
  showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }
  //define error toast
  showError(title: string, message: string){
    this.toastr.error(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }
}
