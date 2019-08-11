import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnDestroy, OnInit {

  firstName=''; lastName=''; gender=''; email=''; phone=''; 
  loading = false;
  dtOptions: DataTables.Settings = {};
  candidates: Candidate[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  candidate: Candidate;
 
  @Output() closeModalEvent = new EventEmitter<boolean>();
  constructor(private candidateSerice: CandidateService) {
    
   }

  ngOnInit() {  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loadData();
    
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.loading=false;
  }
  loadData(){
    this.loading=true;
    this.candidateSerice.getCandidates().subscribe(data=>{
      this.candidates=data;
      this.dtTrigger.next();
    },
    error=>console.log(error));
  }
  addCandidate(){
    this.candidate= new Candidate(this.firstName, this.lastName, this.gender, this.phone, this.email);
    this.candidateSerice.createCandidate(this.candidate).subscribe(data=>{
      this.candidates=data;
      this.candidateSerice.getCandidates().subscribe(data=>this.candidates=data);
      this.closeModalEvent.emit(false);
      
    }, error=>console.log(error));
  
  }
  


}
