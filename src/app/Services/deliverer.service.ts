import { Response } from './../Models/token';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DelivererService {

  private url: string = environment.url
  
  constructor(
    private http: HttpClient
    ) { }

    public findDeliverers(): Observable<Response>{
      return this.http.get<Response>(`${this.url}/orders/deliverer`);
    }

}
