import {Component, Inject} from '@angular/core';

import {Platform} from '@ionic/angular';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {StorageService} from './services/storage.service';


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
  ) {
    this.initializeApp();


  }

  initializeApp() {
    this.platform.ready().then(() => {
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
