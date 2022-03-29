import { Client } from './../Models/client';
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
  
  constructor(private http: HttpClient) { }

  public login(loginDto: Login): Observable<Token>{ 
    return this.http.post<Token>(`${this.url}/user/login`, loginDto) 
  } 

  // public signUp(loginDto: Client): Observable<Token>{ 
  //   return this.http.post<Token>(`${this.url}/client/login`, loginDto) 
  // } 


  public findAll(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.url}/user/all`)
  }
  
}
