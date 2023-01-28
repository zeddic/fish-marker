import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';
import { Catch } from '../catches/catch.model';
import { CatchesService } from '../catches/catches.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
	faCog = faCog;
	faLogOut = faRightFromBracket;
	userSubscription!: Subscription;
	user: any;
	catches!: Catch[];
	personalBest = { lbs: 0, oz: 0 };
	count = 0;

	constructor(private auth: AngularFireAuth, private router: Router, private userService: UserService, private catchesService: CatchesService) { }

	ngOnInit(): void {
		this.userSubscription = this.userService.userDetails.subscribe(user => {
			this.user = user;
		});

		this.userSubscription = this.catchesService.userCatches.subscribe(catches => {
			if (catches !== null) {
				catches.forEach((item: any) => {
					if (item.lbs >= this.personalBest.lbs) {
						this.personalBest = { lbs: item.lbs, oz: (item.oz > this.personalBest.oz ? item.oz : this.personalBest.oz) };
					}
				});
				this.catches = catches;
				this.count = catches.length;
			}
		});
	}

	logout() {
		this.userSubscription.unsubscribe();
		this.auth.signOut();
		this.router.navigate(['login']);
	}
}
