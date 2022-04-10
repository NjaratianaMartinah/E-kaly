import { Response } from './../Models/token';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Profil } from '../Models/profil';
import { Observable } from 'rxjs';
import { PROFIL_TYPE } from '../Models/shared';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private url: string = environment.url
  
  constructor(
    private http: HttpClient
    ) { }

  public createProfil(profil: FormData): Observable<Response>{ 
    return this.http.post<Response>(`${this.url}/restaurants`, profil);
  } 

  public editProfil(profil: FormData): Observable<Response>{ 
    return this.http.put<Response>(`${this.url}/user/edit`, profil);
  } 

  public deleteProfil(profil: Profil): Observable<Response>{ 
    return this.http.delete<Response>(`${this.url}/user/delete/${profil.id}`);
  } 

  public isClient(type : string){
    return type === PROFIL_TYPE.client;
  }

  public isRestaurant(type : string){
    return type === PROFIL_TYPE.restaurant;
  }

  public isDeliverer(type : string){
    return type === PROFIL_TYPE.deliverer;
  }

  public isEkaly(type : string){
    console.log(type);
    console.log("profil ekaly:" + PROFIL_TYPE.ekaly);
    return type === PROFIL_TYPE.ekaly;
  }

}
  