import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeCityId {
  [x: string]: any;
  private subject = new Subject<any>();



  constructor() { }

  sendCityId() {

    this.subject.next();
  }

  getCityId(): Observable<any> {

    return this.subject.asObservable();
  }
  
}
