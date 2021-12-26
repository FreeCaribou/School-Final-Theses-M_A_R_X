import { RelationshipService } from './../../services/relationship/relationship.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { unsubscribeSubscription } from 'src/app/utils/UnsubscribeSubscription';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.page.html',
  styleUrls: ['./relationship.page.scss'],
})
export class RelationshipPage implements OnDestroy {
  isLoading = true;
  relationshipList = new Array<any>();

  subRelationshipList: Subscription;
  subscription;

  constructor(
    private relationshipService: RelationshipService,
    private platform: Platform
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.subRelationshipList = this.relationshipService.getAllRelationship().subscribe(data => {
      this.relationshipList = data;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    unsubscribeSubscription([this.subRelationshipList]);
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
