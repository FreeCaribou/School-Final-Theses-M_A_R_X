import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RelationshipService } from 'src/app/services/relationship/relationship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-relationship',
  templateUrl: './new-relationship.page.html',
  styleUrls: ['./new-relationship.page.scss'],
})
export class NewRelationshipPage {
  relationshipForm;

  isListLoading: boolean = true;
  isItemAdded: boolean = false;
  relationshipTypeList: any[];
  haveRelationshipType: boolean = false;

  defaultHref = 'tabs/relationship';

  constructor(
    private relationshipService: RelationshipService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.initRelationshipTypeList();
    this.relationshipForm = this.fb.group({
      name: ['', Validators.required],
      userRelationshipType: ['', Validators.required]
    });
  }

  initRelationshipTypeList() {
    this.isListLoading = true;
    this.relationshipService.getAllRelationshipType().subscribe(data => {
      this.relationshipTypeList = data;
      if (this.relationshipTypeList.length > 0) {
        this.haveRelationshipType = true;
      } else {
        this.haveRelationshipType = false;
      }
      this.isListLoading = false;
    });
  }

  addRelationship() {
    this.isItemAdded = true;
    this.relationshipService.postRelationship(this.relationshipForm.value).subscribe(
      data => {
        this.isItemAdded = false;
        this.router.navigate(['/' + this.defaultHref]);
      },
      error => {
        this.isItemAdded = false;
      }
    );
  }

}
