import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';
import { Extra } from '../models/extra';
import { Item } from '../models/item';
import { Menu } from '../models/menu';




@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }



  public getMenus() {
    let fullMenu = {};
    this.http.get("assets/menu.json").subscribe((data: any) => {
      fullMenu = this.getGeneralData(data)
      console.log( fullMenu)
    });

    
  }

  private getGeneralData(data: any) {
    let fullMenu: Menu;
    let generalData = data.menu[0];
    let categories = this.getCategories(generalData.categories);

    fullMenu = {
      id: generalData.id,
      name: generalData.name,
      categories: categories
    }
    return fullMenu;
  }

  private getCategories(categories: any[]) {
    let categoriesList: Categorie[] = [];

    categories.forEach(cat => {
      let items = this.getItems(cat.items);
      let categorie: Categorie = {
        name: cat.name,
        items: items
      };

      categoriesList.push(categorie);
    });
    return categoriesList;
  }

  private getItems(items: any[]) {
    let itemList: Item[] = [];
    items.forEach(item => {
      let extras = this.getExtras(item.extras);

      let newItem: Item =
      {
        id: item.id,
        name: item.name,
        price: item.price,
        extras: extras
      }

      itemList.push(newItem);
    });

    return itemList;
  }

  private getExtras(extras: any[]) {
    let extrasList: Extra[] = [];

    extras.forEach(extra => {
      let newExtra: Extra = {
        id: extra.id,
        name: extra.name,
        price: extra.price
      }
      extrasList.push(newExtra);
    });

    return extrasList;
  }
}
