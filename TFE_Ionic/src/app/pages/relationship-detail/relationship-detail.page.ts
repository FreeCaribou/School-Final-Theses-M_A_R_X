import { Payment } from './../../models/Payment';
import { PaymentService } from './../../services/payment/payment.service';
import { Subscription, forkJoin } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelationshipService } from 'src/app/services/relationship/relationship.service';
import { unsubscribeSubscription } from 'src/app/utils/UnsubscribeSubscription';
import { Relationship } from 'src/app/models/Relationship';

@Component({
  selector: 'app-relationship-detail',
  templateUrl: './relationship-detail.page.html',
  styleUrls: ['./relationship-detail.page.scss'],
})
export class RelationshipDetailPage implements OnDestroy {
  id: number;
  relationship: Relationship;
  paymentList: Payment[];
  isLoading = true;

  defaultHref = 'tabs/relationship';
  previousPageRoute: any;

  subGetRelationship: Subscription;

  constructor(
    private route: ActivatedRoute,
    private relationshipService: RelationshipService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.previousPageRoute = '/tabs/relationship/relationship-detail/' + this.id;
    forkJoin(
      this.relationshipService.getOneRelationship(this.id),
      this.paymentService.getAllPayment(null, null, this.id)
    ).subscribe(table => {
      this.relationship = table[0];
      this.paymentList = table[1];
      this.isLoading = false;
    });
    this.subGetRelationship = this.relationshipService.getOneRelationship(this.id).subscribe(data => {
      console.log(data);
      this.relationship = data;
      this.isLoading = false;
    });
  }

  delete() {
    console.log('delete!');
    this.isLoading = true;
    this.relationshipService.deleteOneRelationship(this.id).subscribe(data => {
      this.router.navigate(['/' + this.defaultHref]);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    unsubscribeSubscription([this.subGetRelationship]);
  }

}
