import { Component, OnInit } from '@angular/core';
import { MENUS } from 'src/assets/mock-menu';
import { Categorie } from '../models/categorie';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  categories: Categorie[] = MENUS;
  selectedCategorie?: Categorie;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  onSelect(categorie: Categorie) {
    this.selectedCategorie = categorie;
  }
}
