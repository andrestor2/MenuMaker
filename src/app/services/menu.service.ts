import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/appConstants';

import { Categorie } from '../models/categorie';
import { Extra } from '../models/extra';
import { Item } from '../models/item';
import { FileGenerationService } from './file-generation.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private http: HttpClient,
    private fileGenerationService: FileGenerationService
  ) {}

  public getMenu() {
    /*
    this.http.get('assets/menu.json').subscribe((data: any) => {
      let fullMenu = this.getGeneralData(data).data.menu[0];
      //Save in SessionStorage      
      sessionStorage.setItem(AppConstants.MENU_DATA, JSON.stringify(fullMenu));      
    });
    */
  }

  private getGeneralData(data: any) {
    let fullMenu: Categorie[];
    let categories = this.getCategories(data.categories);

    fullMenu = categories;
    return fullMenu;
  }

  private getCategories(categories: any[]) {
    let categoriesList: Categorie[] = [];

    categories.forEach((cat) => {
      let items = this.getItems(cat.items);
      let categorie: Categorie = {
        name: cat.name,
        items: items,
      };

      categoriesList.push(categorie);
    });
    return categoriesList;
  }

  private getItems(items: any[]) {
    let itemList: Item[] = [];
    items.forEach((item) => {
      let extras = this.getExtras(item.extras);

      let newItem: Item = {
        id: item.id,
        name: item.name,
        price: item.price,
        extras: extras,
      };

      itemList.push(newItem);
    });

    return itemList;
  }

  private getExtras(extras: any[]) {
    let extrasList: Extra[] = [];

    extras.forEach((extra) => {
      let newExtra: Extra = {
        id: extra.id,
        name: extra.name,
        price: extra.price,
      };
      extrasList.push(newExtra);
    });

    return extrasList;
  }
}