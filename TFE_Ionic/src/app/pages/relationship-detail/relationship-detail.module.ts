import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RelationshipDetailPage } from './relationship-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RelationshipDetailPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RelationshipDetailPage]
})
export class RelationshipDetailPageModule { }
