import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { filter, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject = new ReplaySubject<firebase.User | null>(1);
  private currentUser: firebase.User | null = null;

  // uid!: string;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.setupWatchUser();
    this.setupRedirectToLoginPageOnSignOut();
  }

  private setupWatchUser() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.userSubject.next(user);
    });
  }

  private setupRedirectToLoginPageOnSignOut() {
    this.watchUser()
      .pipe(filter((u) => !u))
      .subscribe(() => {
        this.gotoLogin();
      });
  }

  get user() {
    return this.currentUser;
  }

  get uid() {
    return this.currentUser?.uid;
  }

  watchUser() {
    return this.userSubject.asObservable();
  }

  signIn(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        this.gotoLandingPage();
      })
      // NOTE: Instead of catching these errors, I recommend returning them to
      // the component so it can catch it and display something to the user.
      .catch((error) => console.log('An error has occured:', error));
  }

  createUser(email: string, password: string, name: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        userCred.user?.updateProfile({ displayName: name }).then(() => {
          this.gotoLandingPage();
        });
      })
      .catch((error) => console.log('An error has occured:', error));
  }

  private gotoLandingPage() {
    this.router.navigate(['catches']);
  }

  private gotoLogin() {
    this.router.navigate(['login']);
  }
}
