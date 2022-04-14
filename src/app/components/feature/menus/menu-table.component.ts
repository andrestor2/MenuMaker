import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/constants/appConstants';
import { Categorie } from '../../../models/categorie';
import { DataClientService } from '../services/data-client.service';
import { FileGenerationService } from '../services/file-generation.service';
import { MenuService } from '../services/menu.service';
import moment from 'moment';
import report from 'src/assets/mock-Report.json';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})

export class MenuTableComponent implements OnInit {
  selectedCategorie?: Categorie;
  processedMenu: Order[] = [];
  rawMenu?: any;
  username?: string;
  password?: string;
  lastEditTime?: Date;
  creationTime?: Date;
  menuLoaded = false;

  reportToPrint: string = '';

  constructor(
    private menuService: MenuService,
    private dataClientService: DataClientService,
    private fileGenerationService: FileGenerationService
  ) { }

  ngOnInit(): void {
    //this.loadMenu(false);
    this.loadReport();
  }

  loadMenu(useExternal: boolean) {
    let localToken = localStorage.getItem(AppConstants.EXTERNAL_TOKEN);
    this.rawMenu = localStorage.getItem(AppConstants.EXTERNAL_MENU);
    console.log("useExternal: ", useExternal);
    if (!localToken || !this.rawMenu || useExternal) {
      if (this.username && this.password) {
        console.log('Load Data');
        this.rawMenu = { menu: '', lastEditTime: '', creationTime: '' };
        this.menuLoaded = false;
        this.dataClientService.getTokenClient(this.username, this.password).subscribe((res: any) => {
          localStorage.setItem(AppConstants.EXTERNAL_TOKEN, res.waiterioToken);
          localToken = res.waiterioToken;
          if (localToken) {
            this.dataClientService.getMenuClient(localToken).subscribe((res: any) => {
              this.rawMenu.menu = res.menus[0].categories;
              this.rawMenu.lastEditTime = new Date(res.menus[0].lastEditTime);
              this.rawMenu.creationTime = new Date(res.menus[0].creationTime);
              this.lastEditTime = this.rawMenu.lastEditTime;
              this.creationTime = this.rawMenu.creationTime;
              localStorage.setItem(AppConstants.EXTERNAL_MENU, JSON.stringify(this.rawMenu));

              //this.processedMenu = this.menuService.convertToMenuModel(this.rawMenu.menu);
              localStorage.setItem(AppConstants.MENU_DATA, JSON.stringify(this.processedMenu));
              this.menuLoaded = true;
            });
          }
        });
      }
    } else {
      this.menuLoaded = false;
      this.rawMenu = JSON.parse(this.rawMenu);
      this.lastEditTime = this.rawMenu.lastEditTime;
      this.creationTime = this.rawMenu.creationDate;
      //this.processedMenu = this.menuService.convertToMenuModel(this.rawMenu.menu);
      this.menuLoaded = true;
    }
  }

  saveChanges() {
    localStorage.setItem(AppConstants.MENU_DATA, JSON.stringify(this.processedMenu));
  }

  reloadMenu() {
    const empty: Categorie[] = [];
    //this.processedMenu = empty;
  }

  downloadMenuFile() {
    //Get info from localStorage
    const menuData = localStorage.getItem(AppConstants.MENU_DATA);
    if (menuData) {
      const menuObject = <Categorie[]>JSON.parse(menuData);
      //Format the menu data
      const formatedText = this.menuService.convertToTextFormat(menuObject);
      this.fileGenerationService.downloadFile(formatedText);
    } else {
      // Does not exist a menu in the localStorage.
      // Show information below the button.
    }
  }

  loadReport() {
    this.processedMenu = this.processReport(report);

  }

  processReport(report: any[]) {
    let toPrint: string = 'Fecha Orden,Tipo orden,Mesa,Total,Camarero, Email\n';
    let newReport: Order[] = [];
    const usersList = this.createUsersObject();
    console.log(usersList[0]);
    console.table(usersList);
    for (const order of report) {
      const user = usersList.find((user) => user.id === order.usersIds[0]);
      const total = this.getTotal(order);
      newReport.push(
        {
          date: order.creationTime,
          orderType: order.service,
          table: order.table,
          total: total,
          waiter: user.name + ' ' + user.lastName,
          email: user.email
        });
      const creationDate = moment(order.creationTime).format('DD/MM/YYYYTHH:MM:SS');
      toPrint += creationDate + ',' +
        order.service + ',' +
        order.table + ',' +
        total + ',' +
        user.name + ' ' + user.lastName + ',' +
        user.email + '\n';
    }
    this.reportToPrint = toPrint;
    return newReport;
  }

  downloadReport() {
    this.fileGenerationService.downloadFile(this.reportToPrint);
  }

  getTotal(order: any) {
    let total = 0;
    const stamps = order.itemstamps;
    for (let key in stamps) {

      total += stamps[key].item.price;
      for (const extra of stamps[key].extras) {
        total += extra.price;
      }
    }
    return total;
  }

  createUsersObject() {
    const userList: Array<any> = [
      {
        id: "694da876fc6908dd58ea5c46",
        name: "Melo",
        lastName: "Arepa Roja",
        email: "meliferuiz1308@hotmail.com"
      },
      {
        id: "9205661e24d18cdde5165564",
        name: "Salome",
        lastName: "Flor",
        email: "meliferuiz@gmail.com"
      },
      {
        id: "a441da89287f0e7d7ae5142d",
        name: "Mesero",
        lastName: "1",
        email: "laareparoja3@gmail.com"
      },
      {
        id: "caa6a31f6ddb4ae9554b8fba",
        name: "Juan David",
        lastName: "Cabrera",
        email: "juan727@outlook.com"
      },
      {
        id: "da426d2d1efa9d77ee0428c0",
        name: "Cesar",
        lastName: "Ruiz",
        email: "salomeflor2021@gmail.com"
      }
    ];
    return userList;
  }
}

interface Order {
  date: Date;
  orderType: string;
  table: string;
  total: number,
  waiter: string;
  email: string;
}
