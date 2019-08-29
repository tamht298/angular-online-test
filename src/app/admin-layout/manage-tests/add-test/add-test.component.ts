import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionType } from 'src/app/models/question_type';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from '../../../models/subject';
import { PartService } from 'src/app/services/part.service';
import { Question } from 'src/app/models/question';
import { Tests } from 'src/app/models/tests';
import { ClassesService } from '../../../services/classes.service';
import { Classes } from '../../../models/classes';

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
  subjects: Subject;
  parts: any=[];
  selectedSubjectTest: any={};
  selectedPartTest: any={};
  newTest: Tests = new Tests();
  classes: Classes[]=[];
  
  classSelected: Classes[] = [];
  constructor(private testService: TestsService, 
    private questionService: QuestionService,
    private subjectService: SubjectService,
    private partService: PartService,
    private classesService: ClassesService) { }

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
    this.partService.getPartBySubjectId(this.selectedSubjectTest.id).subscribe(data=>this.parts=data);
  }
  //thêm câu hỏi vào bài test
  addTestList(q: Question){
    let index = this.questionList.findIndex(item=>item.id===q.id); 
    this.questionList.splice(index, 1);
    this.listTest.push(q);
  }

  //xoá câu hỏi bài test
  removeTestList(q: Question){
    let index = this.listTest.findIndex(item=>item.id===q.id);  
    this.listTest.splice(index, 1);
    this.questionList.push(q);
  }

  //tạo bài test
  createTest(){
    this.newTest.questionList=this.listTest;
    this.newTest.deleted=false;
    this.newTest.dateTimeTest='2019-08-28 10:02:35';
    console.log(this.newTest);
   
    
    // this.testService.createTest(this.newTest).subscribe(()=>{
    //   console.log('thành công');
      
    // })
  }

  //load dữ liệu của lớp
  loadClasses(){
    this.classesService.getClasses().subscribe(data=>{
      this.classes=data;
      console.log(this.classes);
      
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
    this.newTest.classeSet=this.classSelected;
    
    
  }
}
