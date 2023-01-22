import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';

@Component({
	selector: 'app-catches',
	templateUrl: './catches.component.html',
	styleUrls: ['./catches.component.css']
})
export class CatchesComponent implements OnInit, OnDestroy {
	catches = [];
	catchSubscription!: Subscription;
	constructor(private userService: UserService) { }

	ngOnInit(): void {
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
