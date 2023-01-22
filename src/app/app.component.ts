import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs';
import { UserService } from './auth/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'fish-marker';
	constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private userService: UserService) { }
	showNavigation = false;

	ngOnInit(): void {
		this.auth.onAuthStateChanged(user => {
			if (user) {
				this.showNavigation = true;
				this.userService.userDetails.next(user);
				// Fetch the users previous catches
				this.firestore.collection('catches', ref => ref.where('uid', '==', user.uid)).valueChanges({ idField: 'doc_id' }).pipe(first()).subscribe((catches: any) => {
					this.userService.userCatches.next(catches);
				});
			} else {
				this.showNavigation = false;
				this.userService.userDetails.next({});
				this.userService.userCatches.next([]);
			}
		});
	}
}
