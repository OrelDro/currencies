import {AbstractControl, ValidatorFn} from '@angular/forms';

export function sameCurrency(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value.from !== control.value.to ? null : {sameCurrency: control.value};
}
