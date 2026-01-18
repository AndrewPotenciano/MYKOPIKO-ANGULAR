import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class Footer {
	scrollTo(event: Event, id: string) {
		event.preventDefault();
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
}