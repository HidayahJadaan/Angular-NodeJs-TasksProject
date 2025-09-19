import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createTask } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  // getAllTasks() {
  getAllTasks(filteredData:any) {
    let params = new HttpParams();
    Object.entries(filteredData).forEach(([key, value]: any)=>{

      if(value){
        params = params.append(key, value)
      }

    });
    // let headers = new HttpHeaders();
    //  headers =  headers.append('Authorization', `Bearer `+ localStorage.getItem('token') );

    // return this.http.get('https://angtasksprojectcrud.onrender.com/tasks/all-tasks', {headers})
    return this.http.get(
      environment.tasksApi +'/all-tasks', {params}
    );

    //  return this.http.get('/tasks/all-tasks');
  }

  // ==============================================================================
  createTask(model: any) {
    return this.http.post(
      environment.tasksApi +'/add-task',
      model
    );
  } // END createTask
  // ==============================================================================
  deleteTask(id:any){
    return this.http.delete(environment.tasksApi+ '/delete-task/' + id)
  }
  // ==============================================================================
 updateTask(model: any, id:any) {
    return this.http.put(
      environment.tasksApi +'/edit-task/'+ id,
      model
    );
  } // END createTask

}
