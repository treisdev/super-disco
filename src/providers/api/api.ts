import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export interface Proposicao {
  tipoSigla: string;
  numero: number;
  ano: number;
}

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiProvider {
  constructor(public http: Http) {}

  public searchProposicao(proposicao) {
    const base = 'https://dadosabertos.camara.leg.br/api/v2/proposicoes';
    const parametros = `?siglaTipo=${proposicao.siglaTipo}&numero=${proposicao.numero}&ano=${proposicao.ano}`;
    const periodo = '&dataInicio=2000-01-01&dataFim=2017-12-31';
    const url = base + parametros + periodo;
    return this.http.get(url);
  }

  public getProposicao(proposicaoIncompleta) {
    if (proposicaoIncompleta.uri === null) {
      return this.http.get('assets/empty.json');
    }
    return this.http.get(proposicaoIncompleta.uri);
  }

  public getAutores(proposicao) {
    if (proposicao.uriAutores === null) {
      return this.http.get('assets/person.png');
    }
    return this.http.get(proposicao.uriAutores);
  }
}
