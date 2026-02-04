import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneFormat]',
  standalone: true,
})
export class PhoneFormatDirective {
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 0) {
      if (value.length <= 4) {
        value = value.slice(0, 4);
      } else if (value.length <= 7) {
        value = value.slice(0, 4) + ' ' + value.slice(4);
      } else {
        value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 11);
      }
    }

    input.value = value;
  }
}
