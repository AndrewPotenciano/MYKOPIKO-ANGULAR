import { Pipe, PipeTransform } from '@angular/core';
import { LABELS } from '@shared/constants/label.const';

@Pipe({ name: 'validationMessage', standalone: true, pure: true })
export class ValidationMessagePipe implements PipeTransform {
    private labels = LABELS;

    transform(errorObj: { [key: string]: any } | null | undefined): string {
        if (!errorObj) return '';

        const errorKey = Object.keys(errorObj)[0];

        switch (errorKey) {
            case 'required':
            case 'name':
                return this.labels.FIELD_REQUIRED;
            case 'email':
                return this.labels.EMAIL_INVALID;

            default:
                return '';
        }
    }
}
