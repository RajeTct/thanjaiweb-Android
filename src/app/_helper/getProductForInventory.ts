import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class getProduct {
  [x: string]: any;
  private subject = new Subject<any>();



  constructor() { }
  sendProduct() {
    this.subject.next();
  }

  getProduct(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
