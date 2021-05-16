import { FormControl } from "@angular/forms";

export function salaryValidator(ctrl: FormControl): {[s: string]: boolean} | null {
    if ((isNaN(ctrl.value)) || ctrl.value.length < 4) {
      return { invalid: true }
    }

    return null
  }