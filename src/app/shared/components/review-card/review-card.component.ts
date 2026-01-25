import { ChangeDetectionStrategy, Component, input } from '@angular/core';


export interface Review {
	name: string;
	title: string;
	comment: string;
	image: string;
	starsImage: string;
}

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
