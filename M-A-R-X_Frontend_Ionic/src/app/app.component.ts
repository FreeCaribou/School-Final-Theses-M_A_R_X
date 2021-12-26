import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from 'src/environments/environment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import Auth0Cordova from '@auth0/cordova';
import { AuthService } from './services/auth/auth.service';

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
    private alertController: AlertController
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

    const acceptedLangs = ['en', 'fr', 'no', 'nl', 'de'];
    this.translate.addLangs(acceptedLangs);

    if (!localStorage.getItem('lang')) {
      let userLang = window.navigator.language.slice(0, 2);
      if (acceptedLangs.findIndex(x => x === userLang) === -1) {
        userLang = 'en';
      }
      localStorage.setItem('lang', userLang);
      this.translate.use('en');
    }

    this.translate.use(localStorage.getItem('lang'));
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
