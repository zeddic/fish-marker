import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './auth/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'fish-marker';
	constructor(private auth: AngularFireAuth, private userService: UserService) { }
	showNavigation = false;

	ngOnInit(): void {
		this.auth.onAuthStateChanged(user => {
			if (user) {
				this.showNavigation = true;
				this.userService.userDetails.next(user);
			} else {
				this.showNavigation = false;
				this.userService.userDetails.next({});
			}
		});
	}
}
