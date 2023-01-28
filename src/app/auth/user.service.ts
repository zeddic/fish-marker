import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	user = new BehaviorSubject<User | null>(null);

	userDetails = new BehaviorSubject({}); // Contains the logged in user's details

	constructor() { }

	setUser(user: User) {
		this.user.next(user);
	}
}
