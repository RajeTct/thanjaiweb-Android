
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiUrl } from '../_constants/api.constants';
import { LookUp } from '../_models/look-up';

@Injectable({
  providedIn: 'root',
})

export class ClientService {

  shareData!: any[];

  AddtionalQuantityflag: any;
  clientName: any;
  private subject = new Subject<any>();

  constructor(private http: HttpClient, public router: Router) { }
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  httpOptionheader = {
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers':
        'Authorization, Origin, Content-Type, X-CSRF-Token',
    }),
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  //Get Method for getting images for Home Page Carousel
  GetPaidPromotionForHome() {
    const apiurl = `${apiUrl.GetPaidPromotionForHome}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get categories by passing city id
  GetAllCategoryList(CityId: any) {
    const apiurl = `${apiUrl.GetAllCategoryList}?CityId=${CityId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllClientBasicInfo(cityId: any, IsFlag: any, isSearching: any): Observable<any[]> {
    const apiurl = `${apiUrl.GetAllClientBasicInfo}?cityId=${cityId}&IsFlag=${IsFlag}&isSearching=${isSearching}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Images for categorydetail page
  GetPaidPromotionForCategory(CategoryId: any) {
    const apiurl = `${apiUrl.GetPaidPromotionForCategory}?categoryId=${CategoryId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Images for categorydetail page
  GetPaidPromotionClientByCategoryId(CategoryId: any, cityId: any) {
    const apiurl = `${apiUrl.GetPaidPromotionClientByCategoryId}?categoryId=${CategoryId}&cityId=${cityId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Images for categorydetail page
  GetClientByCategoryTypeId(CategoryId: any, cityId: any) {
    const apiurl = `${apiUrl.GetClientByCategoryTypeId}?categoryId=${CategoryId}&cityId=${cityId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetFilesByClientId(clientId: any): Observable<any> {
    const apiurl = `${apiUrl.GetFilesByClientId}?clientId=${clientId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Client info by passing param CustomUrl for detail page
  GetClientInfoByClientCustomUrl(CustomUrl: any): Observable<any[]> {
    const apiurl = `${apiUrl.GetClientInfoByCustomUrl}?CustomUrl=${CustomUrl}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get All tab list
  GetAllCompanyTabList() {
    const apiurl = `${apiUrl.GetAllCompanyTabList}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get method for subscription detail
  GetSubscriptionForNotification(clientId: any): Observable<any> {
    const apiurl = `${apiUrl.GetSubscriptionForNotification}?clientId=${clientId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get All City and state For Admin
  GetAllCity(): Observable<LookUp[]> {
    const apiurl = `${apiUrl.GetAllCity}`;
    return this.http
      .get<LookUp[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllProductListForGlobalSearch(isSearching: any, cityId: any): Observable<any[]> {
    const apiurl = `${apiUrl.GetAllProductListForGlobalSearch}?isSearching=${isSearching}&cityId=${cityId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Contact Info Method by passing clientId
  getContactInfo(clientId: any, isPublic: any): Observable<any> {
    const apiurl = `${apiUrl.GetContactInfoByClient}?clientId=${clientId}&isPublic=${isPublic}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //get all bloodrequired
  getAllBloodRequired(BloodRequiredTypeId: any, cityId: any) {
    const apiurl = `${apiUrl.GetAllBloodRequired}?BloodRequiredTypeId=${BloodRequiredTypeId}&cityId=${cityId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetBloodRequiredById(Id: any): Observable<any> {
    const apiurl = `${apiUrl.GetBloodRequiredById}?Id=${Id}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //get all events
  GetAllEvents(Isfilter: any, EventTypeId: any, cityId: any) {
    const url = `${apiUrl.GetAllEvents}?Isfilter=${Isfilter}&EventTypeId=${EventTypeId}&cityId=${cityId}`;
    //const apiurl = `${apiUrl.get_AllEvents}`;
    return this.http
      .get<any[]>(`${url}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get events by eventId
  GetEventsByEventId(EventId: any): Observable<any> {
    const apiurl = `${apiUrl.GetEventsByEventId}?EventId=${EventId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //get all lostfound
  GetAllLostFound(LostFoundTypeId: any, cityId: any) {
    const apiurl = `${apiUrl.GetAllLostFound}?LostFoundTypeId=${LostFoundTypeId}&cityId=${cityId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Lost Found By using Id
  GetLostFoundById(Id: any): Observable<any> {
    const apiurl = `${apiUrl.GetLostFoundById}?Id=${Id}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }


  //Get Product pricing details by passing productid
  GetProductPricingbyProductId(ClientId: any, ProductId: any): Observable<any> {
    const apiurl = `${apiUrl.GetProductPricingbyProductId}?ClientId=${ClientId}&ProductId=${ProductId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //tab
  GetAllProductListForTabSearch(isSearching: any, ClientId: any): Observable<any[]> {
    const apiurl = `${apiUrl.GetAllProductListForTabSearch}?isSearching=${isSearching}&ClientId=${ClientId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get product header List using clientId
  GetProductHeaderListByClientId(clientId: any): Observable<any[]> {
    const apiurl = `${apiUrl.GetProductHeaderListByClientId}?clientId=${clientId}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Product Details by clientId
  GetProductByClientId(clientId: any, isPublic: any): Observable<any> {
    const apiurl = `${apiUrl.GetProductByClientId}?clientId=${clientId}&isPublic=${isPublic}`;
    return this.http
      .get<any[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  //get district for admin
  GetAllDistricts(): Observable<LookUp[]> {
    const apiurl = `${apiUrl.GetAllDistricts}`;
    return this.http
      .get<LookUp[]>(`${apiurl}`)
      .pipe(retry(2), catchError(this.handleError));
  }

}