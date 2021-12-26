import { Payment } from './../../models/Payment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit {
  @Input() paymentList: Payment[];
  @Input() previousPage: string;

  constructor() { }

  ngOnInit() {
    if (!this.previousPage) {
      this.previousPage = '/tabs/home';
    }
  }

  click() {
    console.log('fzeijkdfekzl');
  }

}
