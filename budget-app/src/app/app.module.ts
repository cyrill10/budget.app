import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';


import { AppComponent } from './app.component';
import { OverviewComponent } from './view/overview/overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './view/drawer/drawer.component';
import { TransactionComponent } from './view/transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DrawerComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: OverviewComponent },
      { path: 'overview/:monthId', component: OverviewComponent },
      { path: 'transaction/:monthId', component: TransactionComponent },
    ]),
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
