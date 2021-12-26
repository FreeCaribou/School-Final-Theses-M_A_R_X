import { PaymentService } from './../../services/payment/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from './../../models/Payment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {
  id: number;
  payment: Payment;

  reminderDateForm;
  dateNow;
  dateMax;

  defaultHref: string;
  isLoading = true;
  isItemAdded = false;
  isItemDeleted = false;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.dateNow = new Date().toISOString().slice(0, 10);
    this.dateMax = this.dateNow.slice(0, 4);
    this.dateMax = parseInt(this.dateMax, 0) + 5;
    this.reminderDateForm = this.formBuilder.group({
      date: [this.dateNow, Validators.required],
    });
    this.defaultHref = this.route.snapshot.paramMap.get('old-route');
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.init();
  }

  init() {
    this.isLoading = true;
    this.paymentService.getOnePayement(this.id).subscribe(data => {
      this.payment = data;
      this.isLoading = false;
    });
  }

  refunded() {
    this.paymentService.refunded(this.payment.id).subscribe((data: any) => {
      this.init();
    });
  }

  addReminderDate() {
    console.log(this.reminderDateForm.value);
    const jsonToSend = {
      date: this.reminderDateForm.value.date,
      payment: { id: this.id }
    };
    this.paymentService.addReminderDate(jsonToSend).subscribe(data => {
      this.init();
    });
  }

  delete() {
    this.isLoading = true;
    this.paymentService.deleteOnePayment(this.id).subscribe(data => {
      this.router.navigate(['/' + this.defaultHref]);
    });
  }

}
