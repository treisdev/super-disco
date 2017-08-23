import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";

import { DetailPage } from "../detail/detail";
import { AboutPage } from "../about/about";

const aprovometro = require("../../resources/aprovometro.json");

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  proposicoes: Array<any> = [];
  filtro: string = "";
  order: string;
  Math: any;

  aboutPage: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {
    this.Math = Math;
    this.proposicoes = aprovometro;
    this.aboutPage = AboutPage;
  }

  public busca(ev) {
    let val = ev.target.value;
    if (!val || val.trim() == "") {
      this.onClickSearch();
    }
  }

  public onClickSearch() {
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
          .indexOf(this.filtro) > -1
    );
    this.proposicoes = proposicoesFiltradas;
  }

  public onClickProposicao(proposicao) {
    this.navCtrl.push(DetailPage, { proposicao });
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

  public proposicaoHeaderFn(record, recordIndex, records) {
    if (recordIndex === 0) {
      return "Alta chance de aprovação";
    }
    if (
      records[recordIndex - 1].chance > 0.5 &&
      records[recordIndex].chance <= 0.5
    ) {
      return "Média chance de aprovação";
    }
    if (
      records[recordIndex - 1].chance > 0.25 &&
      records[recordIndex].chance <= 0.25
    ) {
      return "Baixa chance de aprovação";
    }
    return null;
  }
}
