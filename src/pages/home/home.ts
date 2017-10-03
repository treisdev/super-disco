import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as latinize from 'latinize';

import { DetailPage } from '../detail/detail';
import { AboutPage } from '../about/about';

const aprovometro = require('../../resources/aprovometro.json');

const cutoffAlta = 0.5;
const cutoffMedia = 0.1;
const FAKE_LOADING_TIME: number = 50;

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
  proposicoes: Array<any> = [];
  items: Array<any> = [];
  filtro: string = '';
  ordenacao: string;

  aboutPage: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private storage: Storage) {
    this.proposicoes = aprovometro.slice();
    this.ordenacao = 'chance';
    for (let i = 0; i < 30; i++) {
      if (this.items.length < this.proposicoes.length) {
        this.items.push(this.proposicoes[this.items.length]);
      }
    }
    this.aboutPage = AboutPage;
  }

  ionViewWillEnter() {
    this.filtrar();
  }

  doInfinite(infiniteScroll) {
    if (this.items.length >= this.proposicoes.length) {
      infiniteScroll.complete();
      return;
    }

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        if (this.items.length < this.proposicoes.length) {
          this.items.push(this.proposicoes[this.items.length]);
        }
      }
      infiniteScroll.complete();
    }, FAKE_LOADING_TIME);
  }

  public onClickProposicao(proposicao) {
    this.navCtrl.push(DetailPage, { proposicao });
  }

  public async filtrar() {
    let origem = aprovometro;
    if (this.ordenacao === 'favoritas') {
      origem = await this.storage.get('favoritas');
    }
    if (this.filtro) {
      this.proposicoes = origem.filter(
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
      this.proposicoes = origem;
    }
    if (this.ordenacao === 'hot') {
      this.proposicoes.sort(byHotDesc);
    }
    if (this.ordenacao === 'chance') {
      this.proposicoes.sort(byChanceDesc);
    }
    this.items = this.proposicoes.slice(0, 30);
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
