import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService,
              private auth: AuthService, 
              private router: Router) {

    this.auth.user$.subscribe(user => {
        if(user) {
          userService.save(user);
          
          let returnUrl = localStorage.getItem('returnUrl');
          if(returnUrl) {
            localStorage.removeItem('returnUrl');
            this.router.navigateByUrl(returnUrl);
          }
        }
    });
  }
}
