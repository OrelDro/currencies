import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {ICurrencyHistory, ICurrencyResponse, IDropDownItem} from "../../common/interfaces/currency";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencyHistory: ICurrencyHistory[] = [];
  private currencyList = new BehaviorSubject<IDropDownItem[]>([]);
  currencyList$ = this.currencyList.asObservable();

  private currencyHistoryList = new BehaviorSubject<ICurrencyHistory[]>([]);
  currencyHistoryList$ = this.currencyHistoryList.asObservable();

  private currenciesSubs: Subscription;

  constructor(private http: HttpClient) {
    this.currenciesSubs = new Subscription();
  }

  getCurrencyList(): void {
    this.currenciesSubs.add(
      this.http.get<{[key: string]: string}>(`https://${environment.host}/currencies`).pipe(
        map( (currencies) => Object.entries(currencies).map( c => ({
          label: c[0],
          value: c[0],
          fullText: c[1]
        })))
      ).subscribe( (response) => {
        this.currencyList.next(response);
        this.currenciesSubs.unsubscribe();
      })
    );
  }

  conversion(amount: number, from: string, to: string): Observable<ICurrencyResponse> {
    return this.http.get<ICurrencyResponse>(`https://${environment.host}/latest?amount=${amount}&from=${from}&to=${to}`);
  }

  saveInHistory(currencyHistory: ICurrencyHistory): void {
    this.currencyHistory = [...this.currencyHistory, currencyHistory];
    this.currencyHistoryList.next(this.currencyHistory);
  }
}
