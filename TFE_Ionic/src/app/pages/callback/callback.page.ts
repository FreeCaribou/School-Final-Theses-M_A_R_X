import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {

  constructor(
    private baseService: BaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('I am in callback');
    this.authService.handleAuthentication();
  }

}
