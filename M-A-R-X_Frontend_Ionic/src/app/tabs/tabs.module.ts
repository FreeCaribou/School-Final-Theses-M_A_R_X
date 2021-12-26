import { ComponentsModule } from './../components/components.module';
import { LoaderComponent } from './../components/loader/loader.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { RelationshipPageModule } from '../pages/relationship/relationship.module';
import { NewRelationshipPageModule } from '../pages/new-relationship/new-relationship.module';
import { SettingPageModule } from '../pages/setting/setting.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    TabsPageRoutingModule,
    RelationshipPageModule,
    NewRelationshipPageModule,
    SettingPageModule,
    TranslateModule
  ],
  declarations: [TabsPage],
  exports: []
})
export class TabsPageModule {}
