import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPage2Component } from './selector-page2.component';

const routes: Routes = [
  {
    path: '',
    component: SelectorPage2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectorPage2RoutingModule { }
