import { DataService } from './data.service';
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
    private dataServ: DataService
    ) { }

  public createProfil(profil: FormData): Observable<Response>{ 
    return this.dataServ.postData(`${this.url}/restaurants`, profil);
  } 

  public editProfil(profil: FormData): Observable<Response>{ 
    return this.dataServ.postData(`${this.url}/user/edit`, profil);
  } 

  public deleteProfil(profil: Profil): Observable<Response>{ 
    return this.dataServ.postData(`${this.url}/user/delete`,profil);
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
    return type === PROFIL_TYPE.ekaly;
  }

}
  