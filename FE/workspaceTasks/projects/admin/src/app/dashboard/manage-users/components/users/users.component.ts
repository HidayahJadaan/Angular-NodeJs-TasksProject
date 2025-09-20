import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { changeUsrStatus, UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
// export interface PeriodicElement {
//   name: string;
//   email: string;
//   tasksAssigned: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { name: 'Hydrogen', email: "1.0079", tasksAssigned:"10-11-2022" },
//   { name: 'Helium', email: "4.0026", tasksAssigned:"10-11-2022" },
//   { name: 'Lithium', email: "6.941", tasksAssigned:"10-11-2022" },
//   { name: 'Beryllium', email: "9.0122", tasksAssigned:"10-11-2022" },
//   { name: 'Boron', email: "10.811", tasksAssigned:"10-11-2022" },
//   { name: 'Carbon', email: "12.010", tasksAssigned:"10-11-2022" },
//   { name: 'Nitrogen', email: "14.006", tasksAssigned:"10-11-2022" },
//   { name: 'Oxygen', email: "15.999", tasksAssigned:"10-11-2022" },
//   { name: 'Fluorine', email: "18.998", tasksAssigned:"10-11-2022" },
//   {  name: 'Neon', email: "20.179", tasksAssigned:"10-11-2022" },
// ];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'username', 'email' ,'role','assignedTasks', 'actions'];
  dataSource:any = [];
  constructor(private userServ:UsersService, private toaster:ToastrService) {

    this.getDataFromSubject()
  }
// ########################################
page = 1
totalItems:any
// ########################################
  ngOnInit(): void {

    // this.getUsersData()
    this.getUser()
  }

  // ========================
  // getUsersData(){

  //   let Model = {
  //     page: this.page,
  //     limit:10,
  //     name:''
  //   }
  //   this.userServ.getAllUsers(Model).subscribe((res:any)=>{

  //     this.totalItems = res.totalItems,
  //     this.dataSource = res.users
  //   })
  // }

  getUser(){
    const Model ={
      page:this.page,
      limit:10,
      name:''
    }

    this.userServ.getUsersData(Model)

}
  // ========================
getDataFromSubject(){
  this.userServ.userData.subscribe((res:any)=>{
    this.dataSource = res.data,
    this.totalItems = res.total
  })
}

  // ========================

  changePage(event:any){

    this.page = event;
    // this.getUsersData()
    this.getUser()
  }

  // ========================
  deleteUser(id:string, index:number){
if(this.dataSource[index].assignedTasks > 0 ){
  this.toaster.error('You Can not Delete This User Until Finish His Tasks')
}
else{

  this.userServ.deleteUser(id).subscribe((res:any)=>{
    this.toaster.success('success', "User Deleted Successfully")
    this.page=1;
    // this.getUsersData()
    this.getUser()
  })

}
  }

  // ========================
  changeUserStatus(status:string, id:string, index:number){

    const model:changeUsrStatus={
      id,
      status
    }
if(this.dataSource[index].assignedTasks > 0 ){
  this.toaster.error('You Can not Delete This User Until Finish His Tasks')
}
else{

  this.userServ.changeUserStatus(model).subscribe((res:any)=>{
    this.toaster.success('success', 'User Status Updated Successfully');
    // this.getUsersData()
    this.getUser()
  })
}
  }
  // ========================
}
