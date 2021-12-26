import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private baseService: BaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.baseService.activeLoader.subscribe(data => {
      console.log('loader', data);
      this.isLoading = data;
      this.verifyAccess();
    });
    // this.authService.handleAuthentication();
    this.verifyAccess();
  }

  verifyAccess() {
    const apiToken = localStorage.getItem('api_token');
    console.log(apiToken);
    if (apiToken != null) {
      this.router.navigate(['tabs']);
    }
  }

  login() {
    this.authService.login();
    // this.authService.loginWithMobile();
  }

}
