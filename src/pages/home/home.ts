import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { DetailPage } from "../detail/detail";
const aprovometro = require("../../resources/aprovometro.json");
const temas = require("../../resources/temas.json");

const filtrarTemas = (temas: Array<{ tema }>, filtros: Array<string>): boolean => {
  if (filtros.length < 1 || !temas) return true;
  return temas.some(tema => filtros.indexOf(tema.tema) > -1);
};

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  proposicoes: Array<any> = [];
  filtro: string = "";
  filtroTemas: Array<string> = [];
  buscaTemas: boolean = false;
  buscaTexto: boolean = false;
  temas: Array<string> = [];
  order: string = "chance";

  constructor(public navCtrl: NavController) {
    this.proposicoes = aprovometro;
    this.temas = temas;
  }

  public busca(ev) {
    let val = ev.target.value;
    if (!val || val.trim() == '') {
      this.onClickSearch();
    }
  }

  onClickSearch() {
    console.log("onClickSearch");
    this.proposicoes = aprovometro;
    // set val to the value of the searchbar
    let val = this.filtro;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filtrar();
    }
    this.proposicoes.sort((a, b) => {
      const aProp = a && a[this.order];
      const bProp = b && b[this.order];
      return aProp < bProp ? 1 : aProp > bProp ? -1 : 0;
    });
    console.log("onClickSearch ended");
  }

  public filtrar() {
    const proposicoesFiltradas = aprovometro.filter(
      proposicao =>
        `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`
          .toLowerCase()
          .indexOf(this.filtro) > -1 &&
        filtrarTemas(proposicao.temas, this.filtroTemas)
    );
    this.proposicoes = proposicoesFiltradas;
    this.proposicoes.sort((a, b) => {
      const aProp = a && a[this.order];
      const bProp = b && b[this.order];
      return aProp < bProp ? 1 : aProp > bProp ? -1 : 0;
    });
  }

  public toggleBuscaTemas() {
    this.buscaTemas = !this.buscaTemas;
  }
  public toggleBuscaTexto() {
    this.buscaTexto = !this.buscaTexto;
  }

  public onClickProposicao(proposicao) {
    this.navCtrl.push(DetailPage, { proposicao });
  }

  onClickTema(tema) {
    this.filtroTemas = [tema];
    this.filtrar();
    this.buscaTemas = false;
  }

  limparFiltroTemas() {
    this.filtroTemas = [];
    this.filtrar();
    this.buscaTemas = false;
  }
}
