import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';


import axios, {isCancel, AxiosError} from 'axios';

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

    const parameter = {
      grant_type: grantType,
      client_id: clientId,
      client_secret: clientSecret,
    };

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

    let authUrl = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';
    // let params = Qs.stringify(data);

    // this.http.post<any>(authUrl, postBody, options).subscribe((data) => {
    //   console.log('data=', data);

    //   this.auth_token = data.access_token
    // });

    axios.post('https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token', parameter, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}).then(({data}) => {this.auth_token = data.access_token; return { 'Authorization': `Bearer ${this.auth_token}`}; });

    // let res = axios({
    //   method: "POST",
    //   url: 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
    //   data: parameter,
    //   headers: { "content-type": "application/x-www-form-urlencoded" },
    // });

    // console.log('res=', res);
    // console.log('res token=', res.access_token);

    // this.auth_token = res;
    // debugger

  // return false;
    // debugger
    return { 'Authorization': `Bearer ${this.auth_token}`};
  }
  private _headers = { headers: this.getAuthorizationHeader() };


  run(){
    console.log('Run DataService');
  }

  // getToken(){
  //   const clientId = environment.tdx.client_id;
  //   const clientSecret = environment.tdx.client_secret;
  //   const grantType = environment.tdx.grant_type;

  //   const parameter = {
  //     grant_type: grantType,
  //     client_id: clientId,
  //     client_secret: clientSecret,
  //   };

  //   const postBody = {
  //     grant_type: grantType,
  //     client_id: clientId,
  //     client_secret: clientSecret
  //   };

  //   let authUrl = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';

  //   const apiHeaders= new HttpHeaders()
  //   .set('content-type', 'application/x-www-form-urlencoded')
  //   .set('Access-Control-Allow-Origin', '*');

  //   let options = {
  //     headers: apiHeaders
  //   };

  //   return this.http.post<any>(authUrl, postBody, options);
  // }

  getDestindaionData(){
    debugger
    return this.http.get(environment.baseUrl + '/v2/Tourism/ScenicSpot', this._headers)
  }

  // async getData ()
  // {
  //   let apiUrl = environment.baseUrl + '/v2/Tourism/ScenicSpot';
  //   try {
  //     let res = await axios.get(apiUrl, {
  //       headers: await this.getAuthorizationHeader(),
  //     });
  //     return await res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }

  // }
}
