import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnDestroy {

 
  // firstName=''; lastName=''; gender=''; email=''; phone=''; 
  loading = false;
  selectedCandidate: any ={};
  newCandidate: any={};
  candidates: Candidate[];
  
  candidate: Candidate;
  selectedId: number;
  
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private candidateSerice: CandidateService, private toastr: ToastrService) {
    
   }
  ngOnInit() {  
  
    this.loadData();

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  loadData(){
    
    this.loading=true;
    this.candidateSerice.getCandidates().subscribe(data=>{
      this.candidates=data;
      this.loading=false;
      this.dtTrigger.next();
    },
    error=>console.log(error));
  }
  addCandidate(){
    
    this.candidate= this.newCandidate;
    this.candidateSerice.createCandidate(this.candidate).subscribe(()=>{

      this.fetchData('closeAddModal');
    }, error=>{
      this.closeModalById("closeAddModal");
      this.showError('Error', 'Failed adding!');
      console.log(error);
      
    });
  
  }
  //get id when click button
  getSelectedId(id:number){
     this.selectedId=id;
    this.candidateSerice.getCandidateById(id).subscribe(data=>this.selectedCandidate=data);
    
  }

  fetchData(idForm: string){
    this.ngOnDestroy();
  
    this.candidateSerice.getCandidates().subscribe(data=>{
      
      this.candidates=data;
      
      //close modal
      this.closeModalById(idForm);
      //show successful toast
      this.showSuccess('Dữ liệu đã cập nhật!', 'Thành công');
      this.dtTrigger.next();
    },
    error=>{
      console.log(error);
      this.closeModalById(idForm);
      this.showError('Cập nhật thất bại', 'Lỗi');
    });
  }
 
  //delete event click
  removeCandidate(){
    this.candidateSerice.deleteCandidate(this.selectedId).subscribe(data=>{  
      //reload data
      this.fetchData('closeDeleteModal');
    }, error=>{   
      console.log(error);      
    });
  }
  editCandidate(){
    
    this.candidateSerice.updateCandidate(this.selectedCandidate).subscribe(()=>{
      
      this.fetchData('closeEditModal');
      
    }, error=>{
      console.log(error);
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
