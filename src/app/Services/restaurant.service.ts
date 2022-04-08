import { Response } from './../Models/token';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Profil } from '../Models/profil';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private url: string = environment.url

  constructor(private http: HttpClient) { }
  
  public findRestaurants(): Observable<Response>{
    return this.http.get<Response>(`${this.url}/restaurants`)
  }

  public findRestaurantById(restaurant: any): Observable<Response>{

    return this.http.get<Response>(this.url.concat("/user/"+restaurant))
  }


  public deleteRestaurant(restaurant: Profil): Observable<Response>{
    return this.http.post<Response>(`${this.url}/restaurants/delete`, restaurant);
  }

}
