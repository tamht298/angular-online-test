import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {

  listTest: any=[];
  constructor(private testService: TestsService) { }

  ngOnInit() {
    this.loadTests();
  }
  loadTests(){
    this.testService.getTests().subscribe(data=>{
      this.listTest=data;
    })
  }

}
