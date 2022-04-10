import { Response } from './../Models/token';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Profil } from '../Models/profil';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private url: string = environment.url
  
  constructor(
    private http: HttpClient
    ) { }

    public findEkalyCommands(): Observable<Response>{
      return this.http.get<Response>(`${this.url}/orders`);
    }

    public AssignCommandDeliverer(request: any): Observable<Response>{
      return this.http.post<Response>(`${this.url}/orders/deliverer`,request);
    }

    public findDelivererCommands(profil: any): Observable<Response>{
        return this.http.get<Response>(this.url.concat("/orders/deliverer/"+profil));
    }

}
