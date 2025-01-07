import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  taskForm: FormGroup;
  tasks = new MatTableDataSource<Task>([]); // MatTableDataSource para la tabla
  displayedColumns: string[] = ['name', 'description', 'status', 'actions'];
  taskStatuses = ['Pendiente', 'En Proceso', 'Completada'];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    // Configuración del formulario
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.taskService.tasks$.subscribe((data) => {
      this.tasks.data = data;
      console.log('data', JSON.stringify(this.tasks.data, null, 4));
    });
  }

  // Agregar una tarea
  addTask() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.tasks.data = [...this.tasks.data, newTask]; // Agregar nueva tarea
      this.taskForm.reset();
    }
  }

  // Eliminar una tarea
  deleteTask(task: any) {
    const updatedTasks = this.tasks.data.filter((t) => t !== task); // Filtrar tareas
    this.tasks.data = updatedTasks; // Actualizar fuente de datos
  }

  // Editar una tarea
  editTask(task: any) {
    this.taskForm.setValue({
      name: task.name,
      description: task.description,
      status: task.status,
    });

    // Eliminar tarea mientras se edita
    this.deleteTask(task);
  }
}
