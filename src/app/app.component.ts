import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'fish-marker';
	constructor(private auth: AngularFireAuth) { }
	showNavigation = false;

	ngOnInit(): void {
		this.auth.onAuthStateChanged(user => {
			if (user) {
				this.showNavigation = true;
			} else {
				this.showNavigation = false;
			}
		});
	}
}
