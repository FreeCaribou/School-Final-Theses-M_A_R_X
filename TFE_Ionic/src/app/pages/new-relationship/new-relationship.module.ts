import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewRelationshipPage } from './new-relationship.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: NewRelationshipPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [NewRelationshipPage]
})
export class NewRelationshipPageModule {}
