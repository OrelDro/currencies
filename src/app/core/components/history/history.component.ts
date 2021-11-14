import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {ICurrencyHistory} from "../../../common/interfaces/currency";
import {Observable} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  currencyHistory$: Observable<ICurrencyHistory[]>;
  constructor(private currencyService: CurrencyService) {
    this.currencyHistory$ = new Observable<ICurrencyHistory[]>();
  }

  ngOnInit(): void {
    this.currencyHistory$ = this.currencyService.currencyHistoryList$;
  }

}
