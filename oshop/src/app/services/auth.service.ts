import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRoute } from '@angular/router';
import { Auth, GoogleAuthProvider, User } from 'firebase/auth';
import { Observable, switchMap } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
      this.user$ = this.afAuth.authState;
    }
    
  login() {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';   
      localStorage.setItem('returnUrl', returnUrl);
      this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }
    
  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
        .pipe(switchMap(user => {
          if(user) return this.userService.get(user.uid).valueChanges();

          return of(null);
        }));
  }
}
