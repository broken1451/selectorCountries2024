import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country.component';

const routes: Routes = [
  {
    path: '',
    component: CountryComponent,
    children: [
      {
        path: 'selector',
        loadChildren: () => import('./pages/selector-page/selector-page.module').then(m => m.SelectorPageModule),
        pathMatch: 'full'
      },
      {
        path: 'selector2',
        loadChildren: () => import('./pages/selector-page2/selector-page2.module').then(m => m.SelectorPage2Module),
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'selector'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
