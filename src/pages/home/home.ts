import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { DetailPage } from "../detail/detail";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  proposicoes: Array<any> = [];
  tipoBusca: string = "assuntos";
  buscaTags: boolean = false;
  proposicoesPadrao: Array<any> = [
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/pl.png",
      numero: 2431,
      ano: 2011,
      tags: [
        { descricao: "Meio Ambiente" },
        { descricao: "Trabalho Escravo" },
        { descricao: "Mulheres" },
        { descricao: "Violencia Domestica" },
        { descricao: "Direito Financeiro" },
        { descricao: "Tributos" },
        { descricao: "Game of Thrones" },
        { descricao: "Senado" }
      ]
    },
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/pec.png",
      numero: 2432,
      ano: 2011,
      tags: [{ descricao: "Mulheres" }, { descricao: "Violencia Domestica" }]
    },
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/plp.png",
      numero: 2433,
      ano: 2011,
      tags: [{ descricao: "Direito Financeiro" }, { descricao: "Tributos" }]
    },
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/pl.png",
      numero: 2431,
      ano: 2011,
      tags: [
        { descricao: "Meio Ambiente" },
        { descricao: "Trabalho Escravo" },
        { descricao: "Mulheres" },
        { descricao: "Violencia Domestica" },
        { descricao: "Direito Financeiro" },
        { descricao: "Tributos" },
        { descricao: "Game of Thrones" },
        { descricao: "Senado" }
      ]
    },
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/pec.png",
      numero: 2432,
      ano: 2011,
      tags: [{ descricao: "Mulheres" }, { descricao: "Violencia Domestica" }]
    },
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/plp.png",
      numero: 2433,
      ano: 2011,
      tags: [{ descricao: "Direito Financeiro" }, { descricao: "Tributos" }]
    },
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/pl.png",
      numero: 2431,
      ano: 2011,
      tags: [
        { descricao: "Meio Ambiente" },
        { descricao: "Trabalho Escravo" },
        { descricao: "Mulheres" },
        { descricao: "Violencia Domestica" },
        { descricao: "Direito Financeiro" },
        { descricao: "Tributos" },
        { descricao: "Game of Thrones" },
        { descricao: "Senado" }
      ]
    },
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/pec.png",
      numero: 2432,
      ano: 2011,
      tags: [{ descricao: "Mulheres" }, { descricao: "Violencia Domestica" }]
    },
    {
      siglaTipo: "PL",
      tipoImg: "assets/img/plp.png",
      numero: 2433,
      ano: 2011,
      tags: [{ descricao: "Direito Financeiro" }, { descricao: "Tributos" }]
    }
  ];

  constructor(public navCtrl: NavController) {
    this.proposicoes = this.proposicoesPadrao;
  }

  ionViewDidLoad() {
    console.log(
      "ionViewDidLoad HomePage, aqui vamos carregar a lista de proposicoes..."
    );
  }

  public busca(ev) {
    // Reset items back to all of the items
    this.proposicoes = this.proposicoesPadrao;

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      const query = val.toLowerCase();
      this.proposicoes = this.proposicoes.filter(
        proposicao =>
          proposicao.numero.toString().indexOf(query) > -1 ||
          proposicao.ano.toString().indexOf(query) > -1 ||
          proposicao.siglaTipo.toLowerCase().indexOf(query) > -1
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
