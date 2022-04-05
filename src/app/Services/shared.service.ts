import { Response } from './../Models/token';
import { Profil } from '../Models/profil';
import { Login } from './../Models/login';
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

  public login(loginDto: Login): Observable<Response>{ 
    return this.http.post<Response>(`${this.url}/user/login`, loginDto);
  } 

  public register(clientDto: Profil): Observable<Token>{ 
    return this.http.post(`${this.url}/user/register`, clientDto);
  } 

  public findAll(): Observable<Profil[]>{
    return this.http.get<Profil[]>(`${this.url}/user/all`)
  }

  public setToken(token: string): void{
    localStorage.setItem("token",token);
  }
  
  public checkToken(): void{
    localStorage.getItem("token");
  }
  
}
