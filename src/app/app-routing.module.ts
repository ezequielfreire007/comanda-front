import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

    ],
  },
  { path: '**', component: PageNotFoundModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
