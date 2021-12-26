import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RelationshipCardComponent } from './relationship-card/relationship-card.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [LoaderComponent, RelationshipCardComponent, HeaderComponent, PaymentListComponent, PaymentSummaryComponent],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        LoaderComponent,
        RelationshipCardComponent,
        HeaderComponent,
        PaymentListComponent,
        TranslateModule,
        ReactiveFormsModule,
        PaymentSummaryComponent,
        FormsModule,
        IonicModule,
        CommonModule
    ]
})
export class ComponentsModule { }
