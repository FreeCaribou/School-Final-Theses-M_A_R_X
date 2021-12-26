import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    public alertCtrl: AlertController,
    private translate: TranslateService
  ) { }

  async showAlert(message) {
    let error;
    this.translate.get('General.Error').subscribe((data: any) => {
      error = data;
    });
    const alert = await this.alertCtrl.create({
      header: error,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          let arrayMessage;
          let message = '';
          if (err.status !== 0) {
            arrayMessage = err.error.message;

            arrayMessage.forEach((e, k) => {
              message += e;
              if (arrayMessage.length !== k + 1) {
                message += ' / ';
              }
            });
          } else {
            message = 'There is an error with the server';
          }

          this.showAlert(message);
        }
      }
    ));

  }
}
