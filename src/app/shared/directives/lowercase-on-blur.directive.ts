import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLowercaseOnBlur]',
  standalone: true,
})
export class LowercaseOnBlurDirective {
  private ngControl = inject(NgControl);

  @HostListener('blur')
  onBlur(): void {
    const control = this.ngControl.control;
    if (!control?.value) return;

    const formatted = control.value.trim().toLowerCase();

    if (formatted !== control.value) {
      control.setValue(formatted, { emitEvent: false });
    }
  }
}