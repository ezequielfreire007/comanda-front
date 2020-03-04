import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigateComponent } from './components/navigate/navigate.component';


const routes: Routes = [
  { path: '', component: NavigateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
