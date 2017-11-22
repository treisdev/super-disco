import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

const DATAS_KEY: string = 'datas';
const PROPOSICOES_KEY: string = 'proposicoes';
const DATAS_URL: string = 'https://raw.githubusercontent.com/treisdev/super-disco/master/src/assets/datas.json';
const PROPOSICOES_URL: string =
  'https://raw.githubusercontent.com/treisdev/super-disco/master/src/assets/aprovometro.json';

@Injectable()
export class AprovometroProvider {
  public todasProposicoes: Array<any>;
  public proposicoes: Array<any>;
  public dataInicial: string;
  public dataFinal: string;
  public possuiAtualizacao: boolean;

  constructor(public http: Http, private storage: Storage) {
    this.carregaDadosStorage();
  }

  public async atualizaDados() {
    try {
      this.proposicoes =
        (await this.http
          .get(PROPOSICOES_URL)
          .map(res => res.json())
          .toPromise()) || [];
      await this.storage.set(PROPOSICOES_KEY, this.proposicoes);
      this.possuiAtualizacao = false;
    } catch (error) {
      console.error(error);
    }
    try {
      const datas = await this.http
        .get(DATAS_URL)
        .map(res => res.json())
        .toPromise();
      this.dataInicial = datas.dataInicial;
      this.dataFinal = datas.dataFinal;
      await this.storage.set(DATAS_KEY, datas);
    } catch (error) {
      console.error(error);
    }
  }

  public async carregaDadosStorage() {
    try {
      this.carregaDatas();
    } catch (error) {
      console.error(error);
    }
  }
  
  async carregaDatas() {
    const datas = await this.storage.get(DATAS_KEY);
    if (datas === null) {
      this.dataInicial = '21/10';
      this.dataFinal = '21/11/2017';
      await this.storage.set(DATAS_KEY, { dataInicial: this.dataInicial, dataFinal: this.dataFinal });
    } else {
      this.dataInicial = datas.dataInicial;
      this.dataFinal = datas.dataFinal;
    }
    this.verificaAtualizacao();
  }

  async verificaAtualizacao() {
    this.possuiAtualizacao = false;
    try {
      const data = await this.http
        .get(DATAS_URL)
        .map(res => res.json())
        .toPromise();
      if (this.dataFinal != data.dataFinal) {
        this.possuiAtualizacao = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async carregaProposicoes() {
    if (this.todasProposicoes) {
      this.proposicoes = this.todasProposicoes.slice();
      return;
    }
    this.todasProposicoes = await this.storage.get(PROPOSICOES_KEY);
    if (this.todasProposicoes === null) {
      this.todasProposicoes = (await this.getProposicoesOffline()) || [];
      await this.storage.set(PROPOSICOES_KEY, this.todasProposicoes);
    }
    this.proposicoes = this.todasProposicoes.slice();
  }

  getProposicoesOffline(): Promise<Array<any>> {
    return this.http
      .get('assets/aprovometro.json')
      .map(res => res.json())
      .toPromise();
  }
}
