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
    const url = `https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaTipo=${proposicao.siglaTipo}&numero=${proposicao.numero}&ano=${proposicao.ano}`;
    return this.http.get(url);
  }

  public getProposicao(proposicaoIncompleta) {
    return this.http.get(proposicaoIncompleta.uri);
  }

  public getAutores(proposicao) {
    return this.http.get(proposicao.uriAutores);
  }
}
