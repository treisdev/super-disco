import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
  ) {
    this.proposicao = navParams.get('proposicao');
  }

  ionViewDidLoad() {
    this.api
      .searchProposicao(this.proposicao)
      .map(res => res.json())
      .subscribe(resultadoBusca => {
        const { dados } = resultadoBusca;
        if (dados.length == 1) {
          this.api
            .getProposicao(dados[0])
            .map(res => res.json())
            .subscribe(resp => {
              this.proposicao = resp.dados;
              this.proposicao.tags = this.proposicao.keywords.split(',');
            });
        }
      });
  }
}
