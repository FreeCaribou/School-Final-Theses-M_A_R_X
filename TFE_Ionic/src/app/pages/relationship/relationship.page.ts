import { RelationshipService } from './../../services/relationship/relationship.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { unsubscribeSubscription } from 'src/app/utils/UnsubscribeSubscription';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.page.html',
  styleUrls: ['./relationship.page.scss'],
})
export class RelationshipPage implements OnDestroy {
  isLoading = true;
  relationshipList = new Array<any>();

  subRelationshipList: Subscription;

  constructor(private relationshipService: RelationshipService) { }

  ionViewWillEnter() {
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

}
