import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrencyConverterComponent} from "./core/components/currency-converter/currency-converter.component";
import {HistoryComponent} from "./core/components/history/history.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'currency-converter',
    pathMatch: 'prefix'
  },
  {
    path: 'currency-converter',
    component: CurrencyConverterComponent,
    pathMatch: 'full'
  },
  {
    path: 'history',
    component: HistoryComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
