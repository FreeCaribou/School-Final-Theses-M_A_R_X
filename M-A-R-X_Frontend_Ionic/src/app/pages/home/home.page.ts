import { Subscription } from 'rxjs';
import { PaymentService } from '../../services/payment/payment.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { Payment } from '../../models/Payment';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  langForm;

  isLoading = true;
  paymentList = new Array<Payment>();

  subGetAllPayment: Subscription;

  refunded = false;
  numberRow = null;
  relationshipId = null;
  type = null;

  subscription;

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    public alertController: AlertController,
    private platform: Platform
  ) {
    this.langForm = this.fb.group({
      lang: [this.translate.getDefaultLang()]
    });
  }

  ionViewWillEnter() {
    this.loadPayment();
  }

  loadPayment() {
    this.isLoading = true;
    this.paymentService.getAllPayment(this.refunded, this.numberRow, this.relationshipId, this.type).subscribe(data => {
      console.log('payment list', data);
      this.paymentList = data;
    }, error => {
    }, () => {
      this.isLoading = false;
    });
  }

  selectedLang() {
    this.translate.use(this.langForm.value.lang);
    this.translate.setDefaultLang(this.langForm.value.lang);
    localStorage.setItem('lang', this.langForm.value.lang);
  }

  selectedType(event) {
    console.log(event.detail.value);
    if (event.detail.value !== undefined && event.detail.value !== '') {
      this.type = event.detail.value;
    } else {
      this.type = null;
    }

    this.loadPayment();
  }

  clickWithRefunded() {
    // this.refunded = !this.refunded;
    console.log(this.refunded);
    this.loadPayment();
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
