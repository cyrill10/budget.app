import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OverviewComponent } from './view/overview/overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionComponent } from './view/transaction/transaction.component';
import { TransactionCreationDialogComponent } from './view/transaction/transaction.component';
import { AccountComponent } from './view/account/account.component';
import { AccountCreationDialogComponent } from './view/account/account.component';
import { VirtualAccountCreationDialogComponent } from './view/account/account.component';

const routes: Routes = [
      { path: '', redirectTo: '/overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'account', component: AccountComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TransactionComponent,
    TransactionCreationDialogComponent,
    AccountComponent,
    AccountCreationDialogComponent,
    VirtualAccountCreationDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
