import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { UserService } from '../auth/user.service';
import { Catch } from '../catches/catch.model';
import { CatchesService } from '../catches/catches.service';

import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);

  icons = { faCog: faCog, faLogOut: faRightFromBracket };
  userSubscription!: Subscription;
  user: firebase.User;
  catches: Catch[] = [];
  personalBest = { lbs: 0, oz: 0 };
  count = 0;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private catchesService: CatchesService
  ) {
    this.user = this.userService.user!;
  }

  ngOnInit(): void {
    // Watch for live updates to the user profile from other tabs?
    this.userSubscription = this.userService
      .watchUser()
      .pipe(takeUntil(this.destroyed))
      .subscribe((user) => {
        this.user = user!;
      });

    this.userSubscription = this.catchesService
      .watchUserCatches(this.userService.uid!)
      .pipe(takeUntil(this.destroyed))
      .subscribe((catches: Catch[] | null) => {
        if (catches !== null) {
          catches.forEach((item: Catch) => {
            if (item.lbs >= this.personalBest.lbs) {
              this.personalBest = {
                lbs: item.lbs,
                oz:
                  item.oz > this.personalBest.oz
                    ? item.oz
                    : this.personalBest.oz,
              };
            }
          });
          this.catches = catches;
          this.count = catches.length;
        }
      });
  }

  logout() {
    this.userSubscription.unsubscribe();
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
