import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';


@Component({
    selector: 'app-root',
    imports: [CommonModule, HttpClientModule, TaskFormComponent, TaskListComponent],
    template: `
    <div class="container mx-auto p-4 max-w-2xl">
      <h1 class="text-2xl font-bold mb-4">Gestionnaire de Tâches</h1>
      <app-task-form (newTask)="addTask($event)"></app-task-form>
      <app-task-list
        [tasks]="tasks"
        (toggleComplete)="toggleTask($event)"
        (delete)="deleteTask($event)"
        (saveEdit)="updateTask($event)"
      ></app-task-list>
    </div>
  `,
    providers: [TaskService]
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(title: string) {
    const task: Task = {
      title,
      completed: false
    };

    this.taskService.addTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }
  updateTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks();
    });
  }
  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}