export interface ICurrencyHistory {
  amount: number;
  from: string;
  to: string;
  date: string;
  conversion: number;
}

export interface ICurrencyResponse {
  amount: number;
  base: string;
  date: string;
  rates: {[key: string]: number}
}

export interface IDropDownItem {
  label: string;
  value: string;
  fullText?: string;
}
