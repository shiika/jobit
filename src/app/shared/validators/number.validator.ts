import { FormControl } from "@angular/forms";

export function numberValidator(control: FormControl): {[s: string]: boolean} | null {
    let inputValue = control.value || " ";
    if (isNaN(control.value) || !inputValue.startsWith("01")) {
      return { invalid: true }
    }

    return null;
  }