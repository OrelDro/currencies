import { Component } from '@angular/core';
import {CurrencyService} from "./core/services/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private currencyService: CurrencyService) {
    this.currencyService.getCurrencyList();
  }

  title = 'currencies-app';
}
