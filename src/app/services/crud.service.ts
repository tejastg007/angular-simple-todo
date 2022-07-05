import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Task } from '../models/task'
import { Observable } from 'rxjs';

//! this classname can be writen in other class file also and be imported using the import statement.
class Task {
  id: number = 0;
  task_name!: string;
}

@Injectable({
  providedIn: 'root'
})


export class CrudService {

  url!: string;
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/task"
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task)
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.url + '/' + task.id)
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.url + '/' + task.id, task)
  }


}
