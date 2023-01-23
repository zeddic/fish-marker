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

	constructor(private auth: AngularFireAuth, private router: Router, private userService: UserService) { }

	ngOnInit(): void {
		this.userSubscription = this.userService.userDetails.subscribe(user => {
			this.user = user;
		});
	}

	logout() {
		this.userSubscription.unsubscribe();
		this.auth.signOut();
		this.router.navigate(['login']);
	}
}
