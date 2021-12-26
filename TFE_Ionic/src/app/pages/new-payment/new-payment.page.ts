import { PaymentService } from './../../services/payment/payment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Relationship } from 'src/app/models/Relationship';
import { RelationshipService } from 'src/app/services/relationship/relationship.service';
import { Payment } from 'src/app/models/Payment';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.page.html',
  styleUrls: ['./new-payment.page.scss'],
})
export class NewPaymentPage {
  idRelationship: number;
  defaultHref: string;

  paymentForm: any;

  suggestedCurrenciesList: string[];
  relationshipList: Relationship[];

  isLoading = true;
  isItemAdded = false;

  date = new Date().toDateString();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private relationshipService: RelationshipService,
    private router: Router
  ) {
    this.paymentForm = this.formBuilder.group({
      title: ['', Validators.required],
      detail: [''],
      currency: ['', Validators.required],
      relationship: [, Validators.required],
      amount: [, Validators.required],
      type: [, Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  ionViewWillEnter() {
    this.init();
  }

  init() {
    console.log(this.date);
    this.defaultHref = this.route.snapshot.paramMap.get('old-route');
    this.idRelationship = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    if (this.defaultHref === null) {
      this.defaultHref = '/tabs/payment';
    }
    forkJoin(
      this.paymentService.getSuggestedCurrencies(),
      this.relationshipService.getAllRelationship()
    ).subscribe(table => {
      this.suggestedCurrenciesList = table[0];
      this.relationshipList = table[1];

      if (this.idRelationship > 0) {
        this.selectDirectTheRelationship();
      }

      this.isLoading = false;
    });
  }

  selectDirectTheRelationship() {
    this.paymentForm.get('relationship').setValue(this.relationshipList.find(x => x.id === this.idRelationship));
  }

  currencySelectedChange(event) {
    this.paymentForm.get('currency').setValue(event.detail.value);
  }

  addPayment() {
    this.isItemAdded = true;
    console.log(this.paymentForm.value);
    this.paymentService.create(this.paymentForm.value).subscribe(data => {
      console.log(data);
      this.isItemAdded = false;
      this.router.navigate(['/' + this.defaultHref]);
    }, error => { this.isItemAdded = false; });
  }

}
