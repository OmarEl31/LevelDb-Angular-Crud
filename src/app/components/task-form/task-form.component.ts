import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-task-form',
    imports: [FormsModule],
    template: `
    <div class="mb-4">
      <input
        [(ngModel)]="taskTitle"
        (keyup.enter)="submitTask()"
        placeholder="Nouvelle tâche"
        class="border p-2 rounded mr-2"
    
      />
      <button
        (click)="submitTask()"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ajouter
      </button>
      <!-- Message d'erreur -->
      <p *ngIf="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
  `,
    styles: [
        `
      .border-red-500 {
        border-color: red;
      }
      .text-red-500 {
        color: red;
      }
    `,
    ]
})
export class TaskFormComponent {
  @Output() newTask = new EventEmitter<string>();
  taskTitle = '';
  errorMessage = '';
  submitTask() {
    if (this.taskTitle.trim()) {
      this.newTask.emit(this.taskTitle);
      this.taskTitle = '';
      this.errorMessage = ''; // Efface le message d'erreur
    }
     else {
    // Si le champ est vide ou invalide
    this.errorMessage = 'Le titre de la tâche est obligatoire.';
  }
  }
}