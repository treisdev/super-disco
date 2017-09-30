import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as latinize from 'latinize';

import { DetailPage } from '../detail/detail';
import { AboutPage } from '../about/about';

const aprovometro = require('../../resources/aprovometro.json');

const cutoffAlta = 0.5;
const cutoffMedia = 0.1;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  proposicoes: Array<any> = [];
  filtro: string = '';
  ordenacao: string;
  Math: any;

  aboutPage: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.Math = Math;
    this.proposicoes = aprovometro;
    this.aboutPage = AboutPage;
    this.ordenacao = 'chance';
  }

  public busca(ev) {
    let val = ev.target.value;
    if (!val || val.trim() == '') {
      this.filtrar();
    }
  }

  public onClickSearch() {
    this.filtrar();
  }

  public filtrar() {
    if (this.filtro) {
      const proposicoesFiltradas = aprovometro.filter(
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
      this.proposicoes = proposicoesFiltradas;
    } else {
      this.proposicoes = aprovometro;
    }
  }

  public colorByTipo(sigla) {
    switch (sigla) {
      case 'PL':
        return '#607D8B';
      case 'PLP':
        return '#9E9E9E';
      case 'PEC':
        return '#795548';
      default:
        return '#000';
    }
  }

  public onClickProposicao(proposicao) {
    this.navCtrl.push(DetailPage, { proposicao });
  }

  public percentToHex(value) {
    const hue = (value * 120).toString(10);
    return ['hsl(', hue, ',80%,40%)'].join('');
  }

  public getColorByBgColor(bgColor) {
    return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2 ? '#333' : '#fff';
  }

  public colorByPercentage(value): any {
    const background = this.percentToHex(value);
    const foreground = this.getColorByBgColor(background);

    return { background, foreground };
  }

  public chanceToText(chance) {
    if (chance > cutoffAlta) return 'ALTA';
    if (chance > cutoffMedia) return 'MÉDIA';
    return 'BAIXA';
  }

  public proposicaoHeaderFn(record, recordIndex, records) {
    const altaChanceHeader = 'Alta chance de aprovação';
    const mediaChanceHeader = 'Média chance de aprovação';
    const baixaChanceHeader = 'Baixa chance de aprovação';

    if (recordIndex === 0) {
      if (record.chance > cutoffAlta) return altaChanceHeader;
      if (record.chance > cutoffMedia) return mediaChanceHeader;
      return baixaChanceHeader;
    }
    if (records[recordIndex - 1].chance > cutoffAlta && records[recordIndex].chance <= cutoffAlta) {
      return mediaChanceHeader;
    }
    if (records[recordIndex - 1].chance > cutoffMedia && records[recordIndex].chance <= cutoffMedia) {
      return baixaChanceHeader;
    }
    return null;
  }

  onChangeOrdenacao() {
    console.log(this.ordenacao);
  }
}
