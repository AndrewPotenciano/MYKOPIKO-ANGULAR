import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTrim]',
  standalone: true,
})
export class TrimDirective {
  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (input?.value) {
      input.value = input.value.trim();
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
