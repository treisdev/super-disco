import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

const packageInfo = require("../../../package.json");

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  version: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.version = packageInfo.version;
  }

  ionViewDidLoad() {
  }

}
