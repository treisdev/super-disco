import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  getData() {
    return this.http.get('assets/aprovometro.json').map(res => res.json());
  }
}
