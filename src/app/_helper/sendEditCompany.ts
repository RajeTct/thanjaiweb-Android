import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class paymentMode {
  [x: string]: any;
  private subject = new Subject<any>();



  constructor() { }
  sendPaymentMode(message: string) {
    this.subject.next({ text: message });
  }

  getPaymentMode(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
