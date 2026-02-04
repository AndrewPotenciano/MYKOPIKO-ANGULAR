import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTitleCaseOnBlur]',
  standalone: true,
})
export class TitleCaseOnBlurDirective {
  private ngControl = inject(NgControl);

  @HostListener('blur')
  onBlur(): void {
    const control = this.ngControl.control;
    if (!control?.value) return;

    const formatted = control.value
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char: string) => char.toUpperCase());

    if (formatted !== control.value) {
      control.setValue(formatted);
    }
  }
}
