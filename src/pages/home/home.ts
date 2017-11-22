import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as latinize from 'latinize';

import { DetailPage } from '../detail/detail';
import { AboutPage } from '../about/about';

import { AprovometroProvider } from '../../providers/aprovometro/aprovometro';

const cutoffAlta = 0.5;
const cutoffMedia = 0.1;
const INITIAL_LOAD: number = 30;

const byHotDesc = (a: any, b: any): number => {
  if (a.velocidade < b.velocidade) {
    return 1;
  }
  if (a.velocidade > b.velocidade) {
    return -1;
  }
  if (a.chance < b.chance) {
    return 1;
  }
  if (a.chance > b.chance) {
    return -1;
  }
  return 0;
};

const byChanceDesc = (a: any, b: any): number => {
  if (a.chance < b.chance) {
    return 1;
  }
  if (a.chance > b.chance) {
    return -1;
  }
  if (a.velocidade < b.velocidade) {
    return 1;
  }
  if (a.velocidade > b.velocidade) {
    return -1;
  }
  return 0;
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<any> = [];
  filtro: string = '';
  ordenacao: string;

  aboutPage: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public aprovometro: AprovometroProvider
  ) {
    this.aboutPage = AboutPage;
    this.ordenacao = 'chance';
  }

  ionViewWillEnter() {
    this.filtrar();
  }

  doInfinite(infiniteScroll) {
    if (this.items.length >= this.aprovometro.proposicoes.length) {
      infiniteScroll.complete();
      return;
    }

    for (let i = 0; i < INITIAL_LOAD; i++) {
      if (this.items.length < this.aprovometro.proposicoes.length) {
        this.items.push(this.aprovometro.proposicoes[this.items.length]);
      }
    }
    infiniteScroll.complete();
  }

  public onClickProposicao(proposicao) {
    this.navCtrl.push(DetailPage, { proposicao });
  }

  public async filtrar() {
    await this.aprovometro.carregaProposicoes();
    let origem = this.aprovometro.proposicoes || [];
    if (this.ordenacao === 'favoritas') {
      origem = await this.storage.get('favoritas');
    }
    if (this.filtro) {
      this.aprovometro.proposicoes = origem.filter(
        proposicao =>
          latinize(
            `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano} ${proposicao.temas
              ? proposicao.temas.reduce(
                  (concatString, tema) => (tema ? `${concatString} ${tema.tema}` : concatString),
                  ' '
                )
              : ''}`
          )
            .toLowerCase()
            .indexOf(latinize(this.filtro.toLowerCase())) > -1
      );
    } else {
      this.aprovometro.proposicoes = origem || [];
    }
    if (this.ordenacao === 'hot') {
      this.aprovometro.proposicoes.sort(byHotDesc);
    }
    if (this.ordenacao === 'chance') {
      this.aprovometro.proposicoes.sort(byChanceDesc);
    }
    const maxItens = this.aprovometro.proposicoes.length >= 30 ? 30 : this.aprovometro.proposicoes.length;
    this.items = this.aprovometro.proposicoes.slice(0, maxItens);
  }

  public colorByTipo(sigla) {
    switch (sigla) {
      case 'PL':
        return '#2c3e50';
      case 'PLP':
        return '#95a5a6';
      case 'PEC':
        return '#8e44ad';
      default:
        return '#000';
    }
  }

  public colorByPercentage(chance) {
    if (chance > cutoffAlta) return '#59ad43';
    if (chance > cutoffMedia) return '#f1c40f';
    return '#e74c3c';
  }

  public chanceToText(chance) {
    if (chance > cutoffAlta) return 'ALTA';
    if (chance > cutoffMedia) return 'MÉDIA';
    return 'BAIXA';
  }
}
