import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Profil } from '../Models/profil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private url: string = environment.url
  
  constructor(
    private http: HttpClient
    ) { }

  public createProfil(profil: Profil): Observable<Response>{ 
    return this.http.post<Response>(`${this.url}/user/add`, profil);
  } 

  public editProfil(profil: Profil): Observable<Response>{ 
    return this.http.put<Response>(`${this.url}/user/edit/${profil.id}`, profil);
  } 

  public deleteProfil(profil: Profil): Observable<Response>{ 
    return this.http.delete<Response>(`${this.url}/user/delete/${profil.id}`);
  } 


}
