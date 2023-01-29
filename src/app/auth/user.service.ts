import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	user = new BehaviorSubject<User | null>(null);

	constructor() { }

	setUser(user: User | null) {
		this.user.next(user);
	}
}
