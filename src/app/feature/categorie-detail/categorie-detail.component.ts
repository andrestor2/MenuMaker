import { Component, Input, OnInit } from '@angular/core';

import { Categorie } from '../../models/categorie';

@Component({
  selector: 'app-categorie-detail',
  templateUrl: './categorie-detail.component.html',
  styleUrls: ['./categorie-detail.component.css']
})
export class CategorieDetailComponent implements OnInit {

  @Input() categorie?: Categorie;

  constructor() { }  

  ngOnInit(): void {
    console.log('Start detail component');
    console.log(this.categorie);
  }

}
