import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

import { ToastrService } from 'ngx-toastr';


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
  selectedId: number;
  selectedCandidate: Candidate;
 
  constructor(private candidateSerice: CandidateService, private toastr: ToastrService) {
    
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
      this.closeModalById("closeAddModal");
      this.showSuccess('Success', 'Added succesfully!');
      
    }, error=>{
      this.closeModalById("closeAddModal");
      this.showError('Error', 'Failed adding!');
      console.log(error);
      
    });
  
  }
  //get id when click button
  passId(id:number){
    this.selectedId=id;
    
  }
 
  //delete event click
  removeCandidate(id: number){
    this.candidateSerice.deleteCandidate(id).subscribe(data=>{
      
      console.log(data);
      //reload data
      this.candidateSerice.getCandidates().subscribe(data=>this.candidates=data);
      //close modal
      this.closeModalById('closeDeleteModal');
      //show successful toast
      this.showSuccess('Success', 'Removed successfully!');
      
    }, error=>{
      this.closeModalById('closeDeleteModal');
      this.showError('Error', 'Failed removement!');
      console.log(error);
      
    });
  }
  //define successful toast
  showSuccess(title: string, message: string) {
    this.toastr.success(title, message);
  }
  //define error toast
  showError(title: string, message: string){
    this.toastr.error(title, message);
  }
  closeModalById(idModal: string){
    document.getElementById(idModal).click();
  }
}
