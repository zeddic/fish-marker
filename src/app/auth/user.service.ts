import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	user = new BehaviorSubject<User | null>(null);
	uid!: string;

	constructor(private auth: AngularFireAuth, private router: Router) { }

	setUser(user: User | null) {
		this.user.next(user);
		this.uid = (user !== null ? user.uid : '');
	}

	signIn(email: string, password: string) {
		this.auth.signInWithEmailAndPassword(email, password).then(userCred => {
			this.router.navigate(['catches']);
		}).catch(error => console.log('An error has occured:', error));
	}

	createUser(email: string, password: string, name: string) {
		this.auth.createUserWithEmailAndPassword(email, password).then(userCred => {
			userCred.user?.updateProfile({ displayName: name }).then(() => {
				this.router.navigate(['catches']);
			});
		}).catch(error => console.log('An error has occured:', error));
	}
}
