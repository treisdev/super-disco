import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  proposicoes: Array<any> = [];
  tipoBusca: string = 'assuntos';

  constructor(public navCtrl: NavController) {
    this.proposicoes = [
      { descricao: 'PL 8.666/93' },
      { descricao: 'PL 1.666/83' },
      { descricao: 'PL 3.666/93' },
    ];
  }

  public filtraProposicoes(ev) {
    // Reset items back to all of the items
    this.proposicoes = [
      { descricao: 'PL 8.666/93' },
      { descricao: 'PL 1.666/83' },
      { descricao: 'PL 3.666/93' },
    ];

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      const query = val.toLowerCase();
      this.proposicoes = this.proposicoes.filter(
        prop => prop.descricao.indexOf(query) > -1,
      );
    }
  }

  public vaiPlaneta(proposicao) {
    this.navCtrl.push(DetailPage, proposicao);
  }
}
