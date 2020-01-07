import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusComponent } from './components/menus/menus.component';
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component';


const routes: Routes = [
  { path: '', component: MenusComponent},
  { path: ':id', component: MenuDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
