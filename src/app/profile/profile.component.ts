import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	faCog = faCog;
	faLogOut = faRightFromBracket;

	constructor(private auth: AngularFireAuth, private router: Router) { }

	logout() {
		this.auth.signOut();
		this.router.navigate(['login']);
	}

}
