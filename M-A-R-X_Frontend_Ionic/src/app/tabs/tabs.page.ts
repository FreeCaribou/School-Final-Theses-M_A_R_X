import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  subscription;

  constructor(private platform: Platform) { }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      const app = 'app';
      // navigator[app].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
