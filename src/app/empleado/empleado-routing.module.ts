import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './components/empleados/empleados.component';


const routes: Routes = [
  { path: '', component: EmpleadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
