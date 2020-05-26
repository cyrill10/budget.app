import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent, SettingsDialogComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
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

import { OverviewComponent } from './view/overview/overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionComponent, TransactionDuplicationDialogComponent } from './view/transaction/transaction.component';
import { TransactionCreationDialogComponent } from './view/transaction/transaction.creation.component';
import { AccountComponent, AccountCreationDialogComponent, VirtualAccountCreationDialogComponent } from './view/account/account.component';
import { MatElevationDirective } from './directives/matelevation.directive';
import { VirtualAccountTransactionsComponent } from './view/virtualaccounttransactions/virtual.account.transactions.component';
import { RealAccountTransactionsComponent } from './view/realaccounttransaction/real.account.transactions.component';

import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TransactionComponent,
    TransactionCreationDialogComponent,
    AccountComponent,
    AccountCreationDialogComponent,
    VirtualAccountCreationDialogComponent,
    MatElevationDirective,
    VirtualAccountTransactionsComponent,
    RealAccountTransactionsComponent,
    TransactionDuplicationDialogComponent,
	SettingsDialogComponent
  ],
  entryComponents: [
    TransactionCreationDialogComponent,
    VirtualAccountCreationDialogComponent,
    TransactionDuplicationDialogComponent,
    AccountCreationDialogComponent,
	SettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    IonicModule.forRoot(),
	IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
	MatButtonToggleModule,
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
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
