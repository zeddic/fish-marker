import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
	user: userDetails = { displayName: '', uid: '' };

	constructor(private auth: AngularFireAuth, private router: Router) { }

	ngOnInit(): void {
		this.auth.onAuthStateChanged(user => {
			if (user) {
				const userDetails = {
					displayName: user.displayName,
					uid: user.uid
				};
				this.user = userDetails;
			} else {
				this.user = { displayName: '', uid: '' };
			}
		});
	}

	logout() {
		this.auth.signOut();
		this.router.navigate(['login']);
	}

}
