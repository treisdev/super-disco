import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { DetailPage } from "../detail/detail";
import {
  proposicoes as proposicoesPadrao,
  tags as availableTags
} from "../../resources/proposicoes";

const filtrarTags = (tags: Array<{ id }>, filtros: Array<string>): boolean => {
  console.log(filtros);
  if (filtros.length < 1 || !tags) return true;
  return tags.some(tag => filtros.indexOf(tag.id) > -1);
};

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  proposicoes: Array<any> = [];
  filtro: string = "";
  filtroTags: Array<string> = [];
  tipoBusca: string = "assuntos";
  buscaTags: boolean = false;
  tags = Object.values(availableTags);

  constructor(public navCtrl: NavController) {
    this.proposicoes = proposicoesPadrao;
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
    this.proposicoes = proposicoesPadrao.filter(
      proposicao =>
        `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`
          .toLowerCase()
          .indexOf(this.filtro) > -1 &&
        filtrarTags(proposicao.tags, this.filtroTags)
    );
  }

  public abreBuscaTags() {
    this.buscaTags = true;
  }

  public onClickProposicao(proposicao) {
    this.navCtrl.push(DetailPage, { proposicao });
  }

  onClickTag(tag) {
    this.filtroTags = [tag];
    this.filtrar();
    this.buscaTags = false;
  }

  limparFiltroTags() {
    this.filtroTags = [];
    this.filtrar();
    this.buscaTags = false;
  }
}
