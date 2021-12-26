import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NewRelationshipPage } from '../pages/new-relationship/new-relationship.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        redirectTo: '/tabs/payment',
        pathMatch: 'full'
      },
      {
        path: 'payment', children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule'
          },
          {
            path: 'payment-detail/:id/:old-route',
            loadChildren: '../pages/payment-detail/payment-detail.module#PaymentDetailPageModule'
          },
          {
            path: 'new-payment',
            loadChildren: '../pages/new-payment/new-payment.module#NewPaymentPageModule'
          },
        ]
      },
      {
        path: 'relationship', children: [
          {
            path: '',
            loadChildren: '../pages/relationship/relationship.module#RelationshipPageModule'
          },
          {
            path: 'new-relationship',
            component: NewRelationshipPage
          },
          {
            path: 'relationship-detail/:id',
            children: [
              {
                path: '',
                loadChildren: '../pages/relationship-detail/relationship-detail.module#RelationshipDetailPageModule'
              },
              {
                path: 'payment-detail/:id/:old-route',
                loadChildren: '../pages/payment-detail/payment-detail.module#PaymentDetailPageModule'
              }
              ,
              {
                path: 'new-payment/:old-route',
                loadChildren: '../pages/new-payment/new-payment.module#NewPaymentPageModule'
              }
            ]
          },
        ]
      },
      {
        path: 'setting', children: [
          {
            path: '',
            loadChildren: '../pages/setting/setting.module#SettingPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/payment',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
  { path: 'callback', loadChildren: '../pages/callback/callback.module#CallbackPageModule' },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/tabs/payment',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
