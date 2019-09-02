import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {TestsService} from 'src/app/services/tests.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Tests } from 'src/app/models/tests';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_LANGUAGE } from 'src/app/shared/language-options';


@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  listTest: any = [];
  selectedTest: any={};

  constructor(private testService: TestsService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: CUSTOM_LANGUAGE
    }
    this.testService.getTests().subscribe(data => {
      this.listTest = data;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  fetchData(idForm: string){
    this.testService.getTests().subscribe(data => {
      this.listTest = data;
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  deleteTest(){
    
    this.selectedTest.deleted=true;
    console.log(this.selectedTest);
    this.testService.deleteTest(this.selectedTest).subscribe(()=>{
      this.fetchData('closeDeleteModal');
    }, error=> console.log(error))
    // this.selectedTest.deleted=true;
  
    // this.testService.deleteTest(this.selectedTest.id).subscribe(()=>{
    //   this.fetchData('closeDeleteModal');
      
    // })
  }

  getSelected(id: number){
    this.listTest.forEach(element =>{
      if(element.id===id)
      this.selectedTest=element;
      return;
    });
    
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
