import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { CrudService } from '../services/crud.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task;
  taskArr: Task[] = [];
  addTaskValue!: string; //ngmodel for task value
  editValue!: string;


  constructor(private crudServce: CrudService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudServce.getAllTasks().subscribe((data) => {
      next: this.taskArr = data;
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue
    this.crudServce.addTask(this.taskObj).subscribe((data) => {
      next: this.ngOnInit();
      this.addTaskValue = '';
    });
  }


  callEdit(task: Task) {
    this.taskObj = task;
    this.editValue = task.task_name;
  }

  editTask() {
    this.taskObj.task_name = this.editValue;
    this.crudServce.editTask(this.taskObj).subscribe((data) => {
      this.ngOnInit();
    })
  }

  deleteTask(task: Task) {
    this.crudServce.deleteTask(task).subscribe((data) => {
      this.ngOnInit();
    })
  }
}
