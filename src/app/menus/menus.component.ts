import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})



export class MenusComponent implements OnInit {

  constructor(private menuService: MenuService) { }

    

  ngOnInit(): void {

    this.menuService.getMenus();
    
    
  }

}
