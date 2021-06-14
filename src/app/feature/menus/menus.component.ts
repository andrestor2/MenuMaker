import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/constants/appConstants';
import { Categorie } from '../../models/categorie';
import { DataClientService } from '../services/data-client.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  
  selectedCategorie?: Categorie;
  processedMenu: Categorie[] = [];
  rawMenu?: any;
  menuLoaded = false;

  constructor(
    private menuService: MenuService,
    private dataClientService: DataClientService
  ) { }

  ngOnInit(): void { }

  onSelect(categorie: Categorie) {
    this.selectedCategorie = categorie;
    console.log('Selected: ' + this.selectedCategorie.name);
  }

  loadMenu(useExternal: boolean) {
    let localToken = localStorage.getItem(AppConstants.EXTERNAL_TOKEN);
    this.rawMenu  =localStorage.getItem(AppConstants.EXTERNAL_MENU);
    let username = 'meliferuiz@gmail.com';
    let password = 'Nokia1308';

    if (!localToken || !this.rawMenu || useExternal) {
      console.log('Load Data');
      this.dataClientService.getTokenClient(username, password).subscribe((res: any) => {
        localStorage.setItem(AppConstants.EXTERNAL_TOKEN, res.waiterioToken);
        localToken = res.waiterioToken;
        if (localToken) {
          this.dataClientService.getMenuClient(localToken).subscribe((res: any) => {
            this.rawMenu = res.menus[0].categories;
            localStorage.setItem(AppConstants.EXTERNAL_MENU, JSON.stringify(this.rawMenu));

            this.processedMenu = this.menuService.getGeneralData(this.rawMenu);
            this.menuLoaded = true;
          });
        }
      });
    } else {
      this.rawMenu = JSON.parse(this.rawMenu);
      this.processedMenu = this.menuService.getGeneralData(this.rawMenu);
    }

  }
}
