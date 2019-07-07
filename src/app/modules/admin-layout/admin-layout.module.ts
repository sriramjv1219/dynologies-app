import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { TableListComponent } from './views/table-list/table-list.component';
import { TypographyComponent } from './views/typography/typography.component';
import { IconsComponent } from './views/icons/icons.component';
import { MapsComponent } from './views/maps/maps.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { UpgradeComponent } from './views/upgrade/upgrade.component';
import { AddUserDialogComponent } from './views/modal-dialogs/add-user-dialog/add-user-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { AddProgramDialogComponent } from './views/modal-dialogs/add-program-dialog/add-program-dialog.component';
import { AddClientDialogComponent } from './views/modal-dialogs/add-client-dialog/add-client-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AddUserDialogComponent,
    AddProgramDialogComponent,
    AddClientDialogComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: true, width: '350px' } },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  entryComponents: [
    AddUserDialogComponent,
    AddProgramDialogComponent,
    AddClientDialogComponent
  ]
})

export class AdminLayoutModule { }
