import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  proposicao: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.proposicao = navParams.get('proposicao');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage, aqui vamos carregar os detalhes da proposicao');
  }
}
