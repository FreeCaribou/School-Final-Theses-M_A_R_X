import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;

  subscription;

  constructor(
    private authService: AuthService,
    private baseService: BaseService,
    private router: Router,
    private platform: Platform,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    console.log(this.platform.platforms());

    this.baseService.activeLoader.subscribe(data => {
      console.log('loader', data);
      this.isLoading = data;
      this.verifyAccess();
    });
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
    this.isLoading = true;
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.authService.loginWithMobile();
    } else {
      this.authService.login();
    }
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      const app = 'app';
      navigator[app].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
