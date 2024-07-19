import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectorPageRoutingModule } from './selector-page-routing.module';
import { SelectorPageComponent } from './selector-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    SelectorPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class SelectorPageModule { }
