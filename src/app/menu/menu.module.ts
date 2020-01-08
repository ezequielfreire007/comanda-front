import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenusComponent } from './components/menus/menus.component';
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component';
import { MaterializeModule } from '../materialize/materialize.module';

@NgModule({
  declarations: [MenuComponent, MenusComponent, MenuDetailComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterializeModule
  ]
})
export class MenuModule { }
