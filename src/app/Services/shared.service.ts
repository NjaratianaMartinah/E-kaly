import { DataService } from './data.service';
import { Profil } from 'src/app/Models/profil';
import { Response } from './../Models/token';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private url: string = environment.url
  
  constructor(
    private http: HttpClient
    ) { }

  public login(clientDto: Profil): Observable<Response>{ 
    return this.http.post<Response>(`${this.url}/user/login`, clientDto);
  } 

  public register(clientDto: Profil): Observable<Response>{ 
    return this.http.post<Response>(`${this.url}/user/register`, clientDto);
  } 

  public setUserLocal(profil: Profil){
    profil.password="password";
    localStorage.setItem("profil",JSON.stringify(profil));
    localStorage.setItem("token",profil.token);
  }

  public getUserLocal(){
    let profil: string = localStorage.getItem("profil")  || '{}';
    let user  = JSON.parse(profil);
    return user;
  }
  
  public getToken(): string| null{
    return localStorage.getItem("token");
  }

  public clearLocalStorage(){
    localStorage.clear();
  }
  
}
