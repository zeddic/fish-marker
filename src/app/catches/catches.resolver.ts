import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { first, Observable, of } from 'rxjs';
import { UserService } from '../auth/user.service';
import { CatchesService } from './catches.service';

@Injectable({
  providedIn: 'root',
})
export class CatchesResolver implements Resolve<boolean> {
  constructor(
    private catchesService: CatchesService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // return this.catchesService.fetchUserCatches()

    // this.catchesService.userCatches.pipe(first()).subscribe((catches) => {
    //   if (catches === null) {
    //     console.log('here we go', this.userService.user);
    //     this.catchesService.fetchUserCatches(this.userService.uid!);
    //   }
    // });

    return of(true);
  }
}
