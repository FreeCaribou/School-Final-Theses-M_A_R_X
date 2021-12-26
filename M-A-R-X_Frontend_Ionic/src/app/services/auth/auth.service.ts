import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';
import { env } from '.env';
import { Platform, AlertController } from '@ionic/angular';
import { BaseService } from '../base.service';
import Auth0Cordova from '@auth0/cordova';

(window as any).global = window;

export const AUTH_CONFIG = {
  // Needed for Auth0 (capitalization: ID):
  clientID: environment.clientID,
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: environment.clientID,
  domain: environment.domain,
  packageIdentifier: environment.packageIdentifier // config.xml widget ID, e.g., com.auth0.ionic
};


@Injectable()
export class AuthService {
  isLoggedIn$ = new Subject();
  isLoggedIn = false;
  auth0Json = {
    clientID: environment.clientID,
    domain: environment.domain,
    responseType: 'token id_token',
    audience: 'https://' + env.domain + '/userinfo',
    redirectUri: environment.redirectUriWeb,
    scope: 'openid profile offline_access'
  };
  auth0;
  auth0Authentication;

  Client = new Auth0Cordova(AUTH_CONFIG);
  Auth0 = new auth0.WebAuth(AUTH_CONFIG);

  accessToken: string;

  constructor(
    public router: Router,
    private platform: Platform,
    private baseService: BaseService,
    public alertController: AlertController,
  ) {
    if (this.platform.platforms().find(x => x === 'mobile') || this.platform.platforms().find(x => x === 'cordova')) {
      this.auth0Json.redirectUri = environment.redirectUriMobile;
    } else if (this.platform.platforms().find(x => x === 'desktop')) {
      this.auth0Json.redirectUri = environment.redirectUriWeb;
    }
    this.auth0 = new auth0.WebAuth(this.auth0Json);
    this.auth0Authentication = new auth0.Authentication(this.auth0Json);
    // Check if user is logged In when Initializing
    const loggedIn = this.isLoggedIn = this.isAuthenticated();
    this.isLoggedIn$.next(loggedIn);
  }

  public login(): void {
    this.auth0.authorize();
  }

  public loginWithMobile() {

    const options = {
      scope: 'openid profile offline_access'
    };

    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        this.baseService.activeLoaderPush(false);
        throw err;
      }
      
      // Set access token
      this.accessToken = authResult.accessToken;

      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          console.log('error in auth0');
          const loggedIn = this.isLoggedIn = false;
          this.isLoggedIn$.next(loggedIn);
          this.baseService.activeLoaderPush(false);
          throw err;
        }
        const sub = profile.sub;
        const nickname = profile.nickname;
        const idToken = authResult.idToken;
        const idTokenPayload = {
          sub,
          nickname
        };
        const dataToLogin = { idTokenPayload, idToken };

        this.baseService.login(dataToLogin).subscribe(data => {
          console.log('its good', data);
          localStorage.setItem('api_token', data.apiToken);
          this.baseService.activeLoaderPush(false);
          this.router.navigate(['/tabs']);
        }, error => {
          console.log('error from my backend:', error);
          // TODO error
          this.baseService.activeLoaderPush(false);
          this.router.navigate(['/login']);
        });

      });
    });
  }

  // login with web mode
  public handleAuthentication() {
    console.log('test handleAuthentication');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.baseService.activeLoaderPush(true);
        window.location.hash = '';
        this.setSession(authResult);
        const loggedIn = this.isLoggedIn = true;
        this.isLoggedIn$.next(loggedIn);
        console.log('auth', authResult);
        this.baseService.login(authResult).subscribe(data => {
          console.log('its good', data);
          localStorage.setItem('api_token', data.apiToken);
          this.baseService.activeLoaderPush(false);
          // this.router.navigate(['/tabs']);
        }, error => {
          console.log('error from my backend:', error);
          // TODO error
          this.baseService.activeLoaderPush(false);
          this.router.navigate(['/login']);
        });
      } else if (err) {
        console.log('error in auth0');
        const loggedIn = this.isLoggedIn = false;
        this.isLoggedIn$.next(loggedIn);
        this.baseService.activeLoaderPush(false);
      }
      console.log(this.isLoggedIn);
    });
  }

  loginWithBackend() {

  }

  public userInfo() {
    console.log('test user info');
    this.auth0Authentication.userInfo(localStorage.getItem('access_token'), (err, profile) => {
      console.log('user info:', profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    const loggedIn = this.isLoggedIn = false;
    this.isLoggedIn$.next(loggedIn);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }
}
