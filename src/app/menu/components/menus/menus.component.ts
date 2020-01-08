import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu/menu.service';
import { Menu } from 'src/app/core/models/menu';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  menus: Menu[] = [];

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.fetchMenu();
  }

  clickMenu(id: number) {
    console.log(id);
  }

  fetchMenu() {
    this.menuService.getAllMenus()
    .subscribe( menus => {
      console.log(menus);
      this.menus = menus;
    });
  }

}
