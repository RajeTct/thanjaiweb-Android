import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwtDecode from 'jwt-decode';


interface TokenPayload {
    exp: number;
    // Add other properties from your token payload as needed
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


    constructor(private authService: AuthService, private router: Router,
        private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const authToken = localStorage.getItem('token');
        if (this.authService.isLoggedIn != false && authToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + authToken
                }
            });
        }

        if ((authToken != null && this.authService.isLoggedIn == false) || (authToken == null && this.authService.isLoggedIn != false)) {
            //this.snackBar.open('You are not an authorized person. Please Login!', 'Close', {});
            this.router.navigate(['/signin']);
        }
        this.checkTokenExpiration();

        return next.handle(request);

    }

    checkTokenExpiration(): void {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage or cookies
        if (token) {
            const tokenPayload = jwtDecode(token) as TokenPayload;
            const expirationDate = new Date(tokenPayload.exp * 1000); // Convert expiration time to milliseconds

            if (expirationDate < new Date()) {
                // Token has expired
                // Perform the necessary action (e.g., redirect to the login page, show an alert)
                this.snackBar.open('Your token is expired. Please Login!', 'Close', {});
                this.router.navigate(['/signin']);
                localStorage.removeItem('token');
            }
            // else {
            //     // Token is still valid
            //     console.log('Token is valid');
            // }
            // } else {
            //     // Token is not found
            //     // Perform the necessary action (e.g., redirect to the login page, show an alert)
            //     console.log('Token not found');
        }
    }

}
