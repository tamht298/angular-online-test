import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { timeout } from 'q';


@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

 
  // firstName=''; lastName=''; gender=''; email=''; phone=''; 
  loading = false;
  editedCandidate: any ={};
  newCandidate: any={};
  candidates: Candidate[];
  
  candidate: Candidate;
  selectedId: number;
  
 
  constructor(private candidateSerice: CandidateService, private toastr: ToastrService) {
    
   }

  ngOnInit() {  
  
    this.loadData();
    
  }

  loadData(){
    this.loading=true;
    this.candidateSerice.getCandidates().subscribe(data=>{
      this.candidates=data;
      this.loading=false;
    },
    error=>console.log(error));
  }
  addCandidate(){
    
    this.candidate= this.newCandidate;
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
  passCandidate(candidate: Candidate){
    this.editedCandidate= candidate;
  
  }
 
  //delete event click
  removeCandidate(id: number){
    this.candidateSerice.deleteCandidate(id).subscribe(data=>{
      
      console.log(data);
      //reload data
      // this.candidateSerice.getCandidates().subscribe(data=>this.candidates=data);
      this.loadData();
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
  editCandidate(candidate: Candidate){
    this.candidateSerice.updateCandidate(candidate).subscribe(()=>{
      
      this.candidateSerice.getCandidates().subscribe(data=>this.candidates=data);
      //close modal
      this.closeModalById('closeEditModal');
      //show successful toast
      this.showSuccess('Success', 'Edited successfully!');
    })
  }
  //define successful toast
  showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }
  //define error toast
  showError(title: string, message: string){
    this.toastr.error(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }
  closeModalById(idModal: string){
    document.getElementById(idModal).click();
  }
}
