import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  auth_token: any;

  constructor(private http: HttpClient) { }

  getAuthorizationHeader() {
    const clientId = environment.tdx.client_id;
    const clientSecret = environment.tdx.client_secret;
    const grantType = environment.tdx.grant_type;
    const postBody = {
      grant_type: grantType,
      client_id: clientId,
      client_secret: clientSecret
    };

    const apiHeaders= new HttpHeaders()
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin', '*');

    let options = {
      headers: apiHeaders
    };

    // let params = Qs.stringify(data);

    this.http.post<any>('https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token', postBody, options).subscribe((data) => {

      this.auth_token = data.access_token
    });
    debugger


    return { 'Authorization': `Bearer ${this.auth_token}`};
  }
  private _headers = { headers: this.getAuthorizationHeader() };


  run(){
    console.log('Run DataService');
  }

  getDestindaionData(){
    return this.http.get(environment.baseUrl + '/v2/Tourism/ScenicSpot',this._headers)
  }
}
