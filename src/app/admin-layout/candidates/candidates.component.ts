import { Component, OnInit, OnDestroy, EventEmitter, Output, AfterViewInit, ViewChild } from '@angular/core';

import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ThrowStmt } from '@angular/compiler';
import { CUSTOM_LANGUAGE } from 'src/app/shared/language-options';



@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: CUSTOM_LANGUAGE
    }
    this.newCandidate.gender='MALE'
    this.candidateSerice.getCandidates().subscribe(data=>{
      this.candidates=data;
     
      this.dtTrigger.next();
      
    },
    error=>console.log(error));
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
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

  addCandidate(){
    
    this.candidate= this.newCandidate;
    this.candidateSerice.createCandidate(this.candidate).subscribe(()=>{
      this.fetchData('closeAddModal');
    }, error=>{
      console.log(error);
      
    });
  
  }

  //get id when click button
  getSelectedId(id:number){
     this.selectedId=id;
    this.candidateSerice.getCandidateById(id).subscribe(data=>this.selectedCandidate=data);
    
  }

  fetchData(idForm: string){
  
    this.candidateSerice.getCandidates().subscribe(data=>{
      
      this.candidates=data;
      
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
 
  //delete event click
  removeCandidate(){
    
    this.candidateSerice.getCandidateById(this.selectedId).subscribe(data=>{
      let c = data;
      c.deleted=true;
      this.candidateSerice.deleteCandidate(c).subscribe(()=>{
        this.fetchData('closeDeleteModal');
      }, error=> console.log(error))
    });
  }
  editCandidate(){
    console.log('thành công')
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
