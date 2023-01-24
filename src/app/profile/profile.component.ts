import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';

interface userDetails {
	displayName: string | null,
	uid: string | null
}

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
	catches: any;

	constructor(private auth: AngularFireAuth, private router: Router, private userService: UserService) { }

	ngOnInit(): void {
		this.userSubscription = this.userService.userDetails.subscribe(user => {
			this.user = user;
		});

		this.userSubscription = this.userService.userCatches.subscribe(catches => {
			this.catches = catches;
			let personalBest = { lbs: 0, oz: 0 };
			catches.forEach((item: any) => {
				if (item.lbs >= personalBest.lbs) {
					personalBest = { lbs: item.lbs, oz: (item.oz > personalBest.oz ? item.oz : personalBest.oz) };
				}
			});
			catches.count = catches.length;
			catches.pb = personalBest;
		});
	}

	logout() {
		this.userSubscription.unsubscribe();
		this.auth.signOut();
		this.router.navigate(['login']);
	}
}
