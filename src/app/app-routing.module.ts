import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { SocioGuard } from './guard/socio.guard';
import { MozoGuard } from './guard/mozo.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'mesa',
        canActivate: [SocioGuard, MozoGuard],
        loadChildren: () => import('./mesa/mesa.module').then(m => m.MesaModule)
      },
      {
        path: 'menu',
        canActivate: [SocioGuard, MozoGuard],
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
      },
      {
        path: 'pedido',
        canActivate: [SocioGuard, MozoGuard],
        loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule)
      },
      {
        path: 'empleado',
        canActivate: [SocioGuard, MozoGuard],
        loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule)
      }
    ],
  },
  { path: '**', component: PageNotFoundModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
