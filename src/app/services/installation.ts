import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Installation {

  constructor(public http: HttpClient) {}

  getOne(id: string): Promise<any> {

    const headers = new HttpHeaders().set(
      'X-Parse-Application-Id', environment.appId
    );
    let url = `${environment.apiBaseUrl}/installations/${id}`;

    return this.http.get(url, { headers }).toPromise();
  }

  save(id: string, data: any = {}): Promise<any> {

    const appId = environment.appId;
    const apiBaseUrl = environment.apiBaseUrl;

    const headers = new HttpHeaders().set('X-Parse-Application-Id', appId);
    const bodyString = JSON.stringify(data);
    let url = `${apiBaseUrl}/installations/`;

    if (id) {
      url += id;
      return this.http.put(url, bodyString, { headers }).toPromise();
    } else {
      return this.http.post(url, bodyString, { headers }).toPromise();
    }
  }

}
