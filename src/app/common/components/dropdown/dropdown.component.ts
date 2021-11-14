import {Component, forwardRef, Input, OnInit} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {IDropDownItem} from "../../interfaces/currency";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true}]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

  @Input() options: IDropDownItem[] | null;
  @Input() label: string;
  value: string | null;

  onChange: any = () => {}
  onTouch: any = () => {}

  constructor() {
    this.options = [];
    this.label = "";
    this.value = "";
  }

  ngOnInit(): void {}

  writeValue(val: string) {
    this.value = val;
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

}
