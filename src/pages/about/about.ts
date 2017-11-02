import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version: string;

  constructor(private appVersion: AppVersion) {}

  async ionViewWillLoad() {
    try {
      this.version = await this.appVersion.getVersionNumber();
    } catch (error) {
      this.version = '0.0.6.dev';
    }
  }
}
