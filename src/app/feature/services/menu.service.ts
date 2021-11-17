import { Injectable } from '@angular/core';

import { Categorie } from '../../models/categorie';
import { Addition } from '../../models/addition';
import { Item } from '../../models/item';
import { AppConstants } from 'src/app/constants/appConstants';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() { }

  public convertToMenuModel(data: any) {
    let fullMenu: Categorie[];
    let categories = this.getCategories(data);

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
        additions: extras,
      };

      itemList.push(newItem);
    });

    return itemList;
  }

  private getExtras(extras: any[]) {
    let extrasList: Addition[] = [];

    extras.forEach((extra) => {
      let newExtra: Addition = {
        id: extra.id,
        name: extra.name,
        price: extra.price,
      };
      extrasList.push(newExtra);
    });

    return extrasList;
  }

  convertToTextFormat(menuData: Categorie[]) {
    let formatedText: string = '';
    for (const categorie of menuData) {
      formatedText = formatedText.concat(categorie.name);
      formatedText = formatedText.concat("\n");

      for (const item of categorie.items) {
        formatedText = formatedText.concat(item.name + ' ' + item.price)
        formatedText = formatedText.concat("\n");

        for (const addition of item.additions) {
          formatedText = formatedText.concat(AppConstants.ADDITION_SYMBOL + ' ')
            .concat(addition.name + ' ' + addition.price)
          formatedText = formatedText.concat("\n");
        }
      }
    }
    return formatedText;
  }

}
