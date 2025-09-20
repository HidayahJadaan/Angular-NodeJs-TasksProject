import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface changeUsrStatus {
  id:string,
  status:string
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  // ======================================
  userData = new BehaviorSubject({})
// ======================================

getAllUsers(filterData:any){

  let params = new HttpParams();
  if(filterData){

    Object.entries(filterData).forEach(([key, value]: any)=>{

      if(value){
        params = params.append(key, value)
      }

    });
  }
return this.http.get(environment.authApi+'/users', {params})

}
// ======================================

deleteUser(id:string){

 return this.http.delete(environment.authApi+'/user/'+id)
}
// ======================================

changeUserStatus(model:changeUsrStatus){

  return this.http.put(environment.authApi+'/user-status', model)
}
// ======================================


// ======================================

getUsersData(model?:any){

    this.getAllUsers(model).subscribe((res:any)=>{
 this.userData.next({
data:res.users,
total: res.totalItems

    })
      // this.totalItems = res.totalItems,
      // this.dataSource = res.users
    })
  }


}
