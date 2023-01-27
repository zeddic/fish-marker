import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';
import { CatchesService } from './catches.service';

@Component({
	selector: 'app-catches',
	templateUrl: './catches.component.html',
	styleUrls: ['./catches.component.css']
})
export class CatchesComponent implements OnInit, OnDestroy {
	catches: Catch[] = [];
	catchSubscription!: Subscription;
	constructor(private userService: UserService, private catchesService: CatchesService) { }

	ngOnInit(): void {
		this.catchesService.watchUserCatches('123').subscribe((catches: Catch[]) => {
			console.log(catches);
		});

		// Old catch sub
		this.userService.userCatches.subscribe(catches => {
			this.catches = catches;
		});
	}

	ngOnDestroy(): void {
		if (this.catchSubscription != null) {
			this.catchSubscription.unsubscribe();
		}
	}
}
