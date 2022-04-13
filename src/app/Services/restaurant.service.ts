import { DataService } from './data.service';
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

  constructor(private dataServ: DataService) { }
  
  public findRestaurants(): Observable<Response>{
    return this.dataServ.getData(`${this.url}/restaurants`)
  }

  public findRestaurantById(restaurant: any): Observable<Response>{
    return this.dataServ.getData(this.url.concat("/user/"+restaurant))
  }

  public addPlat(platData: FormData): Observable<Response>{ 
    return this.dataServ.postData(`${this.url}/restaurants/addPlat`, platData);
  } 

  public deleteRestaurant(restaurant: Profil): Observable<Response>{
    return this.dataServ.postData(`${this.url}/restaurants/delete`, restaurant);
  }

  
  public deletePlat(restaurant: Profil): Observable<Response>{
    return this.dataServ.postData(`${this.url}/restaurants/delete/plat`, restaurant);
  }



}
