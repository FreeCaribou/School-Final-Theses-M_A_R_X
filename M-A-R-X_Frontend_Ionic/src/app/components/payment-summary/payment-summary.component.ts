import { Payment } from 'src/app/models/Payment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss'],
})
export class PaymentSummaryComponent implements OnInit {
  @Input()
  payment: Payment;

  constructor() { }

  ngOnInit() {}

}
