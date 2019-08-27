import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {

  listTest: any=[];
  questionList: any=[];
  loading: boolean=false;
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

}
