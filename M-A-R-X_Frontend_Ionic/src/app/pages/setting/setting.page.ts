import { UserRelationshipType } from './../../models/UserRelationshipType';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { RelationshipService } from 'src/app/services/relationship/relationship.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  langForm;
  relationshipTypeList: UserRelationshipType[];

  isLoading = true;
  subscription;

  constructor(
    private translate: TranslateService,
    private relationshipService: RelationshipService,
    private fb: FormBuilder,
    public router: Router,
    private platform: Platform
  ) {
    this.langForm = this.fb.group({
      lang: [this.translate.getDefaultLang()]
    });
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.isLoading = true;
    this.relationshipService.getAllRelationshipType().subscribe(data => {
      this.relationshipTypeList = data;
      this.isLoading = false;
    });
  }

  selectedLang() {
    this.translate.use(this.langForm.value.lang);
    // this.translate.setDefaultLang(this.langForm.value.lang);
    localStorage.setItem('lang', this.langForm.value.lang);
    this.init();
  }

  saveRelationshipTypeReminderDateChange(item) {
    console.log(item);
    this.isLoading = true;
    this.relationshipService.changeReminderDelayRelationshipType(item.id, item.reminderDate).subscribe(data => {
      this.isLoading = false;
    });
  }

  logout() {
    localStorage.removeItem('api_token');
    this.router.navigate(['/login']);
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
