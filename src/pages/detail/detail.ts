import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { ApiProvider } from "../../providers/api/api";

const cutoffAlta = 0.5;
const cutoffMedia = 0.1;

@Component({
  selector: "page-detail",
  templateUrl: "detail.html"
})
export class DetailPage {
  proposicao: any = {};
  proposicaoQuery: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {
    this.proposicaoQuery = navParams.get("proposicao");
  }

  ionViewDidLoad() {
    this.api
      .searchProposicao(this.proposicaoQuery)
      .map(res => res.json())
      .subscribe(resultadoBusca => {
        const { dados } = resultadoBusca;
        if (dados.length == 1) {
          this.api
            .getProposicao(dados[0])
            .map(res => res.json())
            .subscribe(resp => {
              this.proposicao = resp.dados;
              this.proposicao.keywords = this.proposicao.keywords.split(",");
            });
        }
      });
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

  public chanceToText(chance) {
    if (chance > cutoffAlta) return "Alta";
    if (chance > cutoffMedia) return "Média";
    return "Baixa";
  }
}
