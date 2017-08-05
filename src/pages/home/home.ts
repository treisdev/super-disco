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
  buscaTags: boolean = false;
  proposicoesPadrao: Array<any> = [
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/pl.png',
      numero: 2431,
      ano: 2011,
      tags: [
        { descricao: 'Meio Ambiente', color: 'secondary' },
        { descricao: 'Trabalho Escravo', color: 'danger' },
        { descricao: 'Mulheres', color: 'primary' },
        { descricao: 'Violencia Domestica', color: 'danger' },
        { descricao: 'Direito Financeiro', color: 'light' },
        { descricao: 'Tributos', color: 'secondary' },
        { descricao: 'Game of Thrones', color: 'dark' },
        { descricao: 'Senado', color: 'light' },
      ],
    },
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/pec.png',
      numero: 2432,
      ano: 2011,
      tags: [
        { descricao: 'Mulheres', color: 'primary' },
        { descricao: 'Violencia Domestica', color: 'danger' },
      ],
    },
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/plp.png',
      numero: 2433,
      ano: 2011,
      tags: [
        { descricao: 'Direito Financeiro', color: 'light' },
        { descricao: 'Tributos', color: 'secondary' },
      ],
    },
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/pl.png',
      numero: 2431,
      ano: 2011,
      tags: [
        { descricao: 'Meio Ambiente', color: 'secondary' },
        { descricao: 'Trabalho Escravo', color: 'danger' },
        { descricao: 'Mulheres', color: 'primary' },
        { descricao: 'Violencia Domestica', color: 'danger' },
        { descricao: 'Direito Financeiro', color: 'light' },
        { descricao: 'Tributos', color: 'secondary' },
        { descricao: 'Game of Thrones', color: 'dark' },
        { descricao: 'Senado', color: 'light' },
      ],
    },
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/pec.png',
      numero: 2432,
      ano: 2011,
      tags: [
        { descricao: 'Mulheres', color: 'primary' },
        { descricao: 'Violencia Domestica', color: 'danger' },
      ],
    },
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/plp.png',
      numero: 2433,
      ano: 2011,
      tags: [
        { descricao: 'Direito Financeiro', color: 'light' },
        { descricao: 'Tributos', color: 'secondary' },
      ],
    },
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/pl.png',
      numero: 2431,
      ano: 2011,
      tags: [
        { descricao: 'Meio Ambiente', color: 'secondary' },
        { descricao: 'Trabalho Escravo', color: 'danger' },
        { descricao: 'Mulheres', color: 'primary' },
        { descricao: 'Violencia Domestica', color: 'danger' },
        { descricao: 'Direito Financeiro', color: 'light' },
        { descricao: 'Tributos', color: 'secondary' },
        { descricao: 'Game of Thrones', color: 'dark' },
        { descricao: 'Senado', color: 'light' },
      ],
    },
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/pec.png',
      numero: 2432,
      ano: 2011,
      tags: [
        { descricao: 'Mulheres', color: 'primary' },
        { descricao: 'Violencia Domestica', color: 'danger' },
      ],
    },
    {
      siglaTipo: 'PL',
      tipoImg: 'assets/img/plp.png',
      numero: 2433,
      ano: 2011,
      tags: [
        { descricao: 'Direito Financeiro', color: 'light' },
        { descricao: 'Tributos', color: 'secondary' },
      ],
    },
  ];

  constructor(public navCtrl: NavController) {
    this.proposicoes = this.proposicoesPadrao;
  }

  ionViewDidLoad() {
    console.log(
      'ionViewDidLoad HomePage, aqui vamos carregar a lista de proposicoes...',
    );
  }

  public busca(ev) {
    // Reset items back to all of the items
    this.proposicoes = this.proposicoesPadrao;

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      const query = val.toLowerCase();
      this.proposicoes = this.proposicoes.filter(
        proposicao =>
          proposicao.numero.toString().indexOf(query) > -1 ||
          proposicao.ano.toString().indexOf(query) > -1 ||
          proposicao.siglaTipo.toLowerCase().indexOf(query) > -1,
      );
    }
  }

  public abreBuscaTags() {
    this.buscaTags = true;
  }

  public onClickProposicao(proposicao) {
    this.navCtrl.push(DetailPage, { proposicao });
  }

  onClickTag(tag) {
    console.log(tag);
    this.buscaTags = false;
  }
}
