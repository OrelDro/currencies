import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CurrencyService} from "../../services/currency.service";
import {EMPTY, Observable, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {sameCurrency} from "../../validators/sameCurrency"
import {ICurrencyHistory, ICurrencyResponse, IDropDownItem} from "../../../common/interfaces/currency";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {

  currencyForm: FormGroup;
  currencies$: Observable<IDropDownItem[]>;
  conversionValue: number;
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private currencyService: CurrencyService) {
    this.subscription = new Subscription();
    this.currencies$ = new Observable<IDropDownItem[]>();
    this.conversionValue = 0;
    this.currencyForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.001)]],
      from: [null, [Validators.required]],
      to: [null, [Validators.required]]
    });
    this.currencyForm.setValidators(sameCurrency())
  }

  ngOnInit(): void {
    this.currencies$ = this.currencyService.currencyList$;
    this.subscription.add(this.currencyForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap( (values) => {
        if (this.currencyForm.valid) {
          return this.currencyService.conversion(values.amount, values.from, values.to);
        }
        return EMPTY;
      })
    ).subscribe( (res: ICurrencyResponse) => {
      this.conversionValue = res.rates[this.to?.value];
      const historyItem: ICurrencyHistory = {
        amount: this.amount?.value,
        conversion: this.conversionValue,
        from: res.base,
        to: this.to?.value,
        date: res.date
      }
      this.currencyService.saveInHistory(historyItem);
    }, (err) => console.log('err', err)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get amount() {
    return this.currencyForm.get('amount');
  }

  get from() {
    return this.currencyForm.get('from');
  }

  get to() {
    return this.currencyForm.get('to');
  }

}
