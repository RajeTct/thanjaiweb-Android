import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SideMenu {

    [x: string]: any;
    private subject = new Subject<any>();

    constructor() { }

    sendMenu() {
        this.subject.next();
    }

    getMenu(): Observable<any> {
        return this.subject.asObservable();
    }

}
