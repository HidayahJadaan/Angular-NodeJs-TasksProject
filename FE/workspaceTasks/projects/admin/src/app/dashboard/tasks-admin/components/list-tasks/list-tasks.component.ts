import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {status:'Complete' , title: 'Hydrogen', user: "1.0079", deadLineDate:"10-11-2022" },
//   {status:'In-Prossing' , title: 'Helium', user: "4.0026", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Lithium', user: "6.941", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Beryllium', user: "9.0122", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Boron', user: "10.811", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Carbon', user: "12.010", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Nitrogen', user: "14.006", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Oxygen', user: "15.999", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Fluorine', user: "18.998", deadLineDate:"10-11-2022" },
//   { status:'Complete' , title: 'Neon', user: "20.179", deadLineDate:"10-11-2022" },
// ];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];
  // dataSource = ELEMENT_DATA;
  dataSource: any = [];
  tasksFilter!: FormGroup;
  users: any = [
    { name: 'Moahmed', id: '68c83d679065078cfee51192' },
    { name: 'Ali', id: '68c8407d9065078cfee51195' },
  ];

  status: any = [
    { name: this.translate.instant("tasks.complete") },
    { name: 'In-Progress'},
  ];


  // ################################################################################
page:any=1;
pageSize:any=10;
total:any;


filteration:any={
  page: this.page,
  limit:10
}
timeOutId:any;

// ################################################################################
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tasksServ: TasksService,
    // private sppinner: NgxSpinnerService,
    private toaster: ToastrService,
    private translate:TranslateService
  ) {}



  ngOnInit(): void {
    // this.createform()
    this.getAllTasks();
  }

  // createform() {
  //   this.tasksFilter = this.fb.group({
  //     title:[''],
  //     userId:[''],
  //     fromDate:[''],
  //     toDate:['']
  //   })
  // }
  // =======================================================

  getAllTasks() {
    // this.sppinner.show();
    // this.tasksServ.getAllTasks().subscribe(
    this.tasksServ.getAllTasks(this.filteration).subscribe(
      (res: any) => {
        // this.dataSource = this.mappingTasks(res.tasks);
        this.dataSource = this.mappingTasks(res.tasks);
        this.total = res.totalItems;
        // this.sppinner.hide();
      },
      // (error: any) => {
      //   this.toaster.error(error.error.message);
      //   this.sppinner.hide();
      // }
    );
  } //END getAllTasks

  // =======================================================
mappingTasks(data: any[]) {
  return data.map((item) => {
    let fileName = item.image;

    // remove leading 'images/' if present
    if (fileName?.startsWith('images/')) {
      fileName = fileName.replace(/^images\//, '');
    }

    // encode spaces and special chars
    fileName = encodeURIComponent(fileName);

    return {
      ...item,
      user: item.userId.username,
      image: `https://angular-nodejs-tasksproject.onrender.com/images/${fileName}`,
    };
  });
}

  // =======================================================
  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      disableClose:true,
      // هون ممكن ابعتله جاتا واروح على الفورم واستقبلها
      // data:'#565656'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getAllTasks();
      }
    });
  } //END addTask
  // =======================================================
  deleteTask(id: any) {
    // this.sppinner.show();
    this.tasksServ.deleteTask(id).subscribe(
      (res: any) => {
        console.log('Task Deleted Successfully!!');
        this.getAllTasks();
        this.toaster.success('Task Deleted Succssfully!!');
        // this.sppinner.hide();
      },
      (error: any) => {
        this.toaster.error(error.error.message);
        // this.sppinner.hide();
      }
    );
  }
  // =======================================================
  updateTask(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: element,
      disableClose:true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getAllTasks();
      }
    });
  }
  // =======================================================

  search(event:any){

    this.filteration['keyword'] = event.value;
    this.page = 1;
this.filteration['page'] = 1;
    clearTimeout(this.timeOutId);
    this.timeOutId  =  setTimeout(()=>{
      this.getAllTasks();
    }, 2000);

  }
  // =======================================================

  selectUser(event:any){
this.filteration['userId'] = event.value;
 this.page = 1;
this.filteration['page'] = 1;
this.getAllTasks()
  }
  // =======================================================
  selectStatus(event:any){
    this.filteration['status'] = event.value.trim();
     this.page = 1;
this.filteration['page'] = 1;
    this.getAllTasks()
  }
  // =======================================================
  selectDate(event:any, type:any){

    this.filteration[type] = moment(event.value).format('DD-MM-YYYY');
     this.page = 1;
this.filteration['page'] = 1;

    // if(this.filteration['toDate'] && this.filteration['fromDate'] && this.filteration['toDate'] !== 'Invalid date')
    if(type =='toDate' && this.filteration['toDate'] !== 'Invalid date')
      {
        this.getAllTasks()
      }

    }
    // =======================================================


      changePage(event:any){
this.page = event;
this.filteration['page'] = event;
this.getAllTasks()

      }


}
