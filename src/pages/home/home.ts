import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";

import { DetailPage } from "../detail/detail";
import { AboutPage } from "../about/about";

const aprovometro = require("../../resources/aprovometro.json");
const temas = require("../../resources/temas.json");

const filtrarTemas = (
  temas: Array<{ tema }>,
  filtros: Array<string>
): boolean => {
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
  order: string;
  Math: any;

  aboutPage: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {
    this.Math = Math;
    this.proposicoes = aprovometro;
    this.temas = temas;
    this.order = "chance";
    this.aboutPage = AboutPage;
  }

  public busca(ev) {
    let val = ev.target.value;
    if (!val || val.trim() == "") {
      this.onClickSearch();
    }
  }

  onClickSearch() {
    this.proposicoes = aprovometro;
    // set val to the value of the searchbar
    let val = this.filtro;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.filtrar();
    }
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
  }

  public onClickProposicao(proposicao) {
    this.navCtrl.push(DetailPage, { proposicao });
  }


}
