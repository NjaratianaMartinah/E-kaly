import { PROFIL_TYPE } from './../Models/shared';
import { Response } from './../Models/token';
import { Profil } from '../Models/profil';
import { Injectable } from '@angular/core';
import { Token } from '../Models/token';
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

  public register(clientDto: Profil): Observable<Token>{ 
    return this.http.post(`${this.url}/user/register`, clientDto);
  } 

  public findAll(): Observable<Profil[]>{
    return this.http.get<Profil[]>(`${this.url}/user/all`)
  }

  public setUserLocal(profil: Profil){
    localStorage.setItem("token",profil.token);
    localStorage.setItem("profil", profil.email);
    localStorage.setItem("type", profil.type);
    localStorage.setItem("profil", profil.email);
  }
  
  public checkToken(): void{
    localStorage.getItem("token");
  }
  
}
