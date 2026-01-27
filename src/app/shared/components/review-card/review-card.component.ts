import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Review } from '../../models/review.model';
@Component({
	selector: 'app-review-card',
	standalone: true,
	imports: [],
	templateUrl: './review-card.component.html',
	styleUrls: ['./review-card.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewCardComponent {
	review = input.required<Review>();
}
