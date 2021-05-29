import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';
import { FileSaverModule } from 'ngx-filesaver';
import { FormsModule } from '@angular/forms';
import { CategorieDetailComponent } from './categorie-detail/categorie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    CategorieDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FileSaverModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
