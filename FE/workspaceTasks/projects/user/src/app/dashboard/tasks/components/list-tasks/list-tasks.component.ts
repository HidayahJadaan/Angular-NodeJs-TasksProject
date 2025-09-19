import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastRef, ToastrService } from 'ngx-toastr';

// const ELEMENT_DATA: PeriodicElement[] = [
//   {status:'Complete' , title: 'Hydrogen', description: "1.0079", deadLineDate:"10-11-2022" },
//   {status:'In-Prossing' , title: 'Helium', description: "4.0026", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Lithium', description: "6.941", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Beryllium', description: "9.0122", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Boron', description: "10.811", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Carbon', description: "12.010", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Nitrogen', description: "14.006", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Oxygen', description: "15.999", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Fluorine', description: "18.998", deadLineDate:"10-11-2022" },
//   { status:'Complete' , title: 'Neon', description: "20.179", deadLineDate:"10-11-2022" },
// ];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLine','status', 'actions'];
  dataSource :any = [];
  tasksFilter!:FormGroup
  users:any = [
   { name: 'Moahmed', id: '68c83d679065078cfee51192' },
    { name: 'Ali', id: '68c8407d9065078cfee51195' },
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Progress" , id:2},
  ]
  // ###########################################
userData:any;
totalItems:any;
  page:any = 1;
  selectedStatus:string = "In-Progress";
  // ###########################################
  constructor(public dialog: MatDialog ,
    private fb:FormBuilder,
  private tasksServ:TasksService,
  private toaster:ToastrService
  ) { }

  ngOnInit(): void {
    this.createform()
    this.getUserData()
    this.getAllTasks()
  }

  // ========================
  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }

  // ========================

  getUserData(){

    let token = JSON.stringify(localStorage.getItem('token'));
    this.userData = JSON.parse(window.atob(token.split('.')[1]))
    console.log(this.userData);
  }
  // ========================
  getAllTasks() {
let params = {
  page:this.page,
  limit:10,
  status:this.selectedStatus
}
this.tasksServ.getUserTasks(this.userData.userId, params).subscribe((res:any)=>{

this.dataSource = res.tasks;
this.totalItems = res.totalItems

}, error =>{
  this.dataSource = [];
})


  }
  // ========================


  changePage(event:any){
    this.page = event;
    // this.filteration['page'] = event;
    this.getAllTasks()

  }
  // ========================

  completeTask(ele:any){
const MODEL = {
  id:ele._id,
}
this.tasksServ.completeTask(MODEL).subscribe((res:any)=>{
  this.getAllTasks();
  this.toaster.success("Task Completed Successfully", 'success')

})

  }
  // ========================


}
