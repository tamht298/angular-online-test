import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionType } from 'src/app/models/question_type';

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
  constructor(private testService: TestsService, private questionService: QuestionService) { }

  ngOnInit() {
    this.loadQuestion();
  }
  loadTests(){
    this.loading=true;
    this.testService.getTests().subscribe(data=>{
      
      this.listTest=data;
      this.loading=false;
    })
  }
  loadQuestion(){
    this.questionService.getQuestions().subscribe(data=>{
      this.questionList=data;
    })
  }

  //lấy đối tượng câu hỏi được chọn qua id
  getSelectedQuestion(id: number){
    this.questionService.getQuestionById(id).subscribe(data=>{
      this.selectedQuestion=data;
      this.selectedPart=data.part;
      this.selectedSubject=this.selectedPart.subject;
      this.selectedAnswers=this.selectedQuestion.questionAnswersList;
      this.selectedType=this.selectedQuestion.questionType;
      console.log(this.selectedType);
      
    })
  }


}
