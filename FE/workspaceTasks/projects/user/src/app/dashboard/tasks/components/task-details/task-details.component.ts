import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  taskId:any;
  taskDetails:any;
  constructor(private route:ActivatedRoute,
    private tasksServ:TasksService,
    private router:Router,
    private toaster:ToastrService
  ) {
    this.route.paramMap.subscribe((res:any)=>{
this.taskId = res.params['id']
    })
  }
  ngOnInit(): void {

    this.getTaskDetails()
  }

  // ======================
  getTaskDetails(){

    this.tasksServ.taskDetails(this.taskId).subscribe((res:any)=>{
      this.taskDetails = res.tasks;
    })
  }
  // ======================
  completeTask(){
    const MODEL = {
      id: this.taskId,
    }
    this.tasksServ.completeTask(MODEL).subscribe((res:any)=>{
  // this.getAllTasks();

  this.router.navigate(['/tasks'])
  this.toaster.success("Task Completed Successfully", 'success')

})

}
// ======================



}
