import { Component } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { NavController, LoadingController } from "ionic-angular";

import { DetailPage } from "../detail/detail";

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

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer
  ) {
    this.Math = Math;
    this.proposicoes = aprovometro;
    this.temas = temas;
    this.order = "chance";
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
    this.ordernar();
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

  public ordernar() {
    const proposicoesTemp = this.proposicoes.filter(proposicao =>
      filtrarTemas(proposicao.temas, this.filtroTemas)
    );
    proposicoesTemp.sort((a, b) => {
      const aProp = a && a[this.order];
      const bProp = b && b[this.order];
      return aProp < bProp ? 1 : aProp > bProp ? -1 : 0;
    });
    this.proposicoes = proposicoesTemp;
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

  public percentToHex(value) {
    const hue = (value * 120).toString(10);
    return ["hsl(", hue, ",80%,40%)"].join("");
  }

  public getColorByBgColor(bgColor) {
    return parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 2
      ? "#333"
      : "#fff";
  }

  public colorByPercentage(value): any {
    const background = this.percentToHex(value);
    const foreground = this.getColorByBgColor(background);

    return { background, foreground };
  }

  widthStyleByPercentage(value: number): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `width: ${value * 100}%; background-color: ${this.colorByPercentage(
        value
      )}!important`
    );
  }

  textByPercentage(value: number): string {
    if (value < 0.25) {
      return "Chance de aprovação baixa";
    } else if (value < 0.75) {
      return "Chance de aprovação média";
    } else {
      return "Chance de aprovação alta";
    }
  }
}
