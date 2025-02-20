import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
    selector: 'app-task-list',
    imports: [CommonModule, FormsModule],
    template: `
    <ul class="space-y-2">
      <li *ngFor="let task of tasks" class="flex items-center gap-2 p-2 border rounded hover:bg-gray-50">
        <input
          type="checkbox"
          [checked]="task.completed"
          (change)="toggleComplete.emit(task)"
          class="h-4 w-4"
        />
        <!-- Affichage conditionnel pour l'édition -->
        <span *ngIf="!editingTask || editingTask.id !== task.id" [class.line-through]="task.completed" class="flex-grow">
          {{ task.title }}
        </span>
        <input
          *ngIf="editingTask && editingTask.id === task.id"
          [(ngModel)]="editingTask.title"
          class="flex-grow border p-1"
        />
        <!-- Boutons Modifier/Enregistrer -->
        <button
          *ngIf="editingTask && editingTask.id === task.id"
          (click)="saveEditTask(editingTask)"
          class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          Enregistrer
        </button>
        <button
          *ngIf="!editingTask || editingTask.id !== task.id"
          (click)="editTask(task)"
          class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
        >
          Modifier
        </button>
        <button
          (click)="delete.emit(task.id)"
          class="ml-auto bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Supprimer
        </button>
      </li>
    </ul>
  `
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() toggleComplete = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @Output() saveEdit = new EventEmitter<Task>();

  editingTask: Task | null = null;

  editTask(task: Task) {
    this.editingTask = { ...task }; // Clone la tâche pour édition
  }

  saveEditTask(task: Task) {
    this.saveEdit.emit(task); // Émet la tâche modifiée au parent
    this.editingTask = null; // Réinitialise l'état d'édition
  }
}
