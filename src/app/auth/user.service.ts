import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	userDetails = new BehaviorSubject({}); // Contains the logged in user's details
	userCatches = new BehaviorSubject([]); // Contains a list of the logged in user's catches

	constructor() { }
}
