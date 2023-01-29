import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { first, Observable, of } from 'rxjs';
import { UserService } from '../auth/user.service';
import { CatchesService } from './catches.service';

@Injectable({
	providedIn: 'root'
})
export class CatchesResolver implements Resolve<boolean> {

	constructor(private catchesService: CatchesService, private userService: UserService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		this.catchesService.userCatches.pipe(first()).subscribe(catches => {
			if (catches === null) {
				this.catchesService.fetchUserCatches(this.userService.uid);
			}
		});

		return of(true);
	}
}
