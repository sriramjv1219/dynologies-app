import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './modules/admin-layout/admin-layout.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './modules/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }, {
    path: 'authentication',
    component: AuthenticationComponent,
    children: [{
      path: '',
      loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
