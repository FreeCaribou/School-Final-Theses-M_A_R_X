import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from 'src/environments/environment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import Auth0Cordova from '@auth0/cordova';
import { AuthService } from './services/auth/auth.service';

// import { sign } from 'jsonwebtoken';
// import { sign } from 'jws';

// declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private authService: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    console.log('is prod? ', environment.production);
    console.log('is mock? ', environment.mock);
    console.log('the platform', this.platform.platforms());

    // token for the test
    if (environment.mock) {
      localStorage.setItem('api_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZGF0ZSI6IjIwMTgtMTEtMDQgMTM6MDc6MTkifQ.iTvH9DF_oCVmW9pLOOKl-HRTXUH2aQ0UgGrAwsP2GKQ');
    }

    this.translate.addLangs(['en', 'fr', 'no']);
    if (localStorage.getItem('lang')) {
      this.translate.setDefaultLang(localStorage.getItem('lang'));
      this.translate.use(localStorage.getItem('lang'));
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }

    this.translate.setDefaultLang('en');

    this.platform.ready().then(() => {
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      };
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (localStorage.getItem('api_token') == null) {
        this.authService.handleAuthentication();
      }
    });
  }
}
