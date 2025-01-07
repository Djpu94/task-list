import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Redirección a la lista de tareas por defecto
  { path: 'tasks', component: TaskListComponent }, // Ruta para el componente de lista de tareas
  { path: '**', redirectTo: '/tasks' }, // Ruta comodín para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
