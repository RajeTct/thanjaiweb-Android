import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { MatSnackBar } from '@angular/material/snack-bar';
//import { ok } from 'assert';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
        public snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.authService.accountValue) {
                // auto logout if 401 or 403 response returned from api
                //this.authService.logout();
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            this.openSnackBar(err.error.Message, "")
            //console.error(err);
            return throwError(error);
        }))
    }
    // Snackbar call function
    openSnackBar(message: any, action: any) {
        this.snackBar.open(message, action, {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }
}