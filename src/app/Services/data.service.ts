import { SharedService } from './shared.service';
import { Response } from './../Models/token';
import { Observable, retry } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    protected http: HttpClient,
    private sharedServ: SharedService
  ) { }

  postData(url: string, dataObject: any): Observable<Response>{
    const httpOtions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ this.sharedServ.getToken()
      })
    };
    return this.http.post<Response>(url, dataObject, httpOtions).pipe(retry(1));
  }

  getData(url: string): Observable<Response>{
    const httpOtions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ this.sharedServ.getToken()
      })
    };
    return this.http.get<Response>(url, httpOtions).pipe(retry(1));
  }


}
