import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectorPage2RoutingModule } from './selector-page2-routing.module';
import { SelectorPage2Component } from './selector-page2.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectorPage2Component
  ],
  imports: [
    CommonModule,
    SelectorPage2RoutingModule,
    ReactiveFormsModule
  ]
})
export class SelectorPage2Module { }
