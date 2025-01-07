import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  private currentId = 1;

  constructor() {
    // Simula emisión de nuevas tareas cada 5 segundos
    interval(5000)
      .pipe(
        take(5), // Solo emite 5 tareas simuladas
        map(() => this.generateRandomTask()),
        catchError((error) => {
          console.error('Error generating tasks', error);
          return throwError(() => new Error('Error generating tasks'));
        })
      )
      .subscribe((task) => this.addTask(task));
  }

  // Método para agregar tareas
  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([
      ...currentTasks,
      { ...task, id: this.currentId++ },
    ]);
  }

  // Método para eliminar tareas
  deleteTask(id: number): void {
    const currentTasks = this.tasksSubject.value.filter(
      (task) => task.id !== id
    );
    this.tasksSubject.next(currentTasks);
  }

  // Simula la generación de una tarea aleatoria
  private generateRandomTask(): Task {
    const statuses: Task['status'][] = [
      'Pendiente',
      'En Proceso',
      'Completada',
    ];
    return {
      id: 0,
      name: `Tarea ${Math.floor(Math.random() * 100)}`,
      description: 'Descripción generada automáticamente',
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  }
}
