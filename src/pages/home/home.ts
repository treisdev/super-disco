import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { DetailPage } from "../detail/detail";
const aprovometro = require("../../resources/aprovometro.json");
const temas = require("../../resources/temas.json");

const filtrarTemas = (temas: Array<{tema}>, filtros: Array<string>): boolean => {
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

  constructor(public navCtrl: NavController) {
    this.proposicoes = aprovometro;
    this.temas = temas;
  }

  ionViewDidLoad() {
    console.log(
      "ionViewDidLoad HomePage, aqui vamos carregar a lista de proposicoes..."
    );
  }

  public busca(ev) {
    this.filtro = ev.target.value && ev.target.value.trim().toLowerCase();
    this.filtrar();
  }

  public filtrar() {
    this.proposicoes = aprovometro.filter(
      proposicao =>
        `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`
          .toLowerCase()
          .indexOf(this.filtro) > -1 &&
        filtrarTemas(proposicao.temas, this.filtroTemas)
    );
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
