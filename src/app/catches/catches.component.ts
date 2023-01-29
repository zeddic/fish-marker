import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Catch } from './catch.model';
import { CatchesService } from './catches.service';

@Component({
	selector: 'app-catches',
	templateUrl: './catches.component.html',
	styleUrls: ['./catches.component.css']
})
export class CatchesComponent implements OnInit, OnDestroy {
	catches: Catch[] = [];
	catchSubscription!: Subscription;
	constructor(private catchesService: CatchesService) { }

	ngOnInit(): void {
		// Subscribe to list of users catches, if null set to empty array
		this.catchSubscription = this.catchesService.userCatches.subscribe((catches: Catch[] | null) => {
			this.catches = (catches !== null ? catches : []);
		});
	}

	ngOnDestroy(): void {
		this.catchSubscription.unsubscribe();
	}
}
