import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AngularFireObject } from '@angular/fire/compat/database';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$
        .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
        .pipe(map(user => user.isAdmin));  
  }
}
