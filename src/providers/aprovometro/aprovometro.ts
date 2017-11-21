import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AprovometroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AprovometroProvider {
  constructor(public http: Http) {
    console.log('Hello AprovometroProvider Provider');
  }

  public dados: Array<any>;
  public dataInicial: string = '04/09';
  public dataFinal: string = '04/10/2017';

  getOfflineData(): Observable<Array<any>> {
    this.getOnlineData();
    return this.http.get('assets/aprovometro.json').map(res => res.json());
  }

  getOnlineData() {
    this.http
      .get('https://raw.githubusercontent.com/treisdev/super-disco/master/src/assets/aprovometro.json')
      .map(res => res.json())
      .subscribe(data => (this.dados = data));
    this.http
      .get('https://raw.githubusercontent.com/treisdev/super-disco/master/src/assets/datas.json')
      .map(res => res.json())
      .subscribe(data => {
        this.dataInicial = data.dataInicial;
        this.dataFinal = data.dataFinal;
      });
  }
}
