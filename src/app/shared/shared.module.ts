import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientTestingModule
  ],
  exports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
