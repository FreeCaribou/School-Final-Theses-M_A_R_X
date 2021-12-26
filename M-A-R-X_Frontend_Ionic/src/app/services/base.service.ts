import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { AlertController } from '@ionic/angular';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl: string = environment.apiUrl;

  activeLoader = new EventEmitter<any>();
  constructor(private httpClient: HttpClient, public alertController: AlertController) { }

  getApiTokenHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Api-Token', localStorage.getItem('api_token'));
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Content-Language', localStorage.getItem('lang'));
    return headers;
  }

  get(path: string): Observable<any> {
    const headers = this.getApiTokenHeader();
    return this.httpClient.get(this.baseUrl + path, { headers });
  }

  post(path: string, body): Observable<any> {
    const headers = this.getApiTokenHeader();
    return this.httpClient.post(this.baseUrl + path, body, { headers });
  }

  put(path: string, body): Observable<any> {
    const headers = this.getApiTokenHeader();
    return this.httpClient.put(this.baseUrl + path, body, { headers });
  }

  delete(path: string): Observable<any> {
    const headers = this.getApiTokenHeader();
    return this.httpClient.delete(this.baseUrl + path, { headers });
  }

  // TODO
  login(data): Observable<any> {
    console.log('login to my backend', data);
    const body = {
      user_id: data.idTokenPayload.sub,
      name: data.idTokenPayload.nickname
    };
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(body, environment.jwtTokenSign);
    let headers = new HttpHeaders();
    headers = headers.set('it-this-my-auth', token);
    headers = headers.set('idToken', data.idToken);
    headers = headers.set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    // console.log(token);
    if (environment.mock) {
      return of(
        {
          "apiToken": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZGF0ZSI6IjIwMTgtMTEtMDQgMTM6MDc6MTkifQ.iTvH9DF_oCVmW9pLOOKl-HRTXUH2aQ0UgGrAwsP2GKQ`
        });
    } else {
      return this.httpClient.post(this.baseUrl + 'login', body, { headers });
    }
  }

  activeLoaderPush(bool: boolean) {
    this.activeLoader.emit(bool);
  }

}
