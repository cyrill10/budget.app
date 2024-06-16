import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent, SettingsDialogComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { OverviewComponent } from './view/overview/overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TransactionComponent,
  TransactionDuplicationDialogComponent,
} from './view/transaction/transaction.component';
import { TransactionCreationDialogComponent } from './view/transaction/transaction.creation.component';
import {
  AccountComponent,
  AccountCreationDialogComponent,
  VirtualAccountCreationDialogComponent,
} from './view/account/account.component';
import { MatElevationDirective } from './directives/matelevation.directive';
import { VirtualAccountTransactionsComponent } from './view/virtualaccounttransactions/virtual.account.transactions.component';
import { RealAccountTransactionsComponent } from './view/realaccounttransaction/real.account.transactions.component';

import { IonicStorageModule } from '@ionic/storage-angular';
import { ActionReducer, StoreModule } from '@ngrx/store';
import * as fromDate from './state/date/date.reducers';
import { DateState } from './state/date/date.reducers';
import * as fromProcessData from './state/closing-process/closing-process.reducers';
import { ClosingProcessState } from './state/closing-process/closing-process.reducers';
import { DefaultInterceptor } from './services/default.interceptor';
import { ClosingProcessComponent } from './view/closing-process/closing-process.component';
import { EffectsModule } from '@ngrx/effects';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { DateEffects } from './state/date/date.effects';
import { ClosingProcessEffects } from './state/closing-process/closing-process.effects';

import { environment } from 'src/environments/environment';
import { NavigationEffects } from './state/navigation/navigation.effects';
import { ScannedTransactionsComponent } from './view/closing-process/scanned-transactions/scanned-transactions.component';
import { CreationDialogComponent } from './view/closing-process/creation-dialog/creation-dialog.component';
import { TransferDetailsComponent } from './view/closing-process/transfer-details/transfer-details.component';
import { CommonModule } from '@angular/common';

export interface State {
  date?: DateState;
  closingProcess?: ClosingProcessState;
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers = environment.production ? [] : [debug];

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
    SettingsDialogComponent,
    ClosingProcessComponent,
    ScannedTransactionsComponent,
    CreationDialogComponent,
    TransferDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(
      {
        date: fromDate.reducer,
        closingProcess: fromProcessData.reducer,
      },
      { metaReducers },
    ),
    EffectsModule.forRoot([
      DateEffects,
      ClosingProcessEffects,
      NavigationEffects,
    ]),
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
    CommonModule,
  ],
  providers: [
    Chooser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
