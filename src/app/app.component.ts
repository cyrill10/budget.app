import {Component, Inject} from '@angular/core';

import {Platform} from '@ionic/angular';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {StorageService} from './services/storage.service';
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free/ngx";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    public dialog: MatDialog,
    private storage: StorageService,
    private admobFree: AdMobFree
  ) {
    this.initializeApp();
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-2394265918006916/8613809469"
    };
    this.admobFree.banner.config(bannerConfig);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is("ios")) {
        this.showBannerAd();
      }
    });
  }

  openSettings(): void {
    const settingsDialog = this.dialog.open(SettingsDialogComponent, {
        data: this.storage.getURL()
      }
    );

    settingsDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.storage.setURL(result);
      }
    });
  }

  showBannerAd() {


    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
  }
}

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.html',
  styleUrls: ['app.component.css']
})
export class SettingsDialogComponent {

  constructor(
    public settingsDialog: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  onNoClick(): void {
    this.settingsDialog.close();
  }
}
