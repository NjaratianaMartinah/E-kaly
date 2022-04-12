import { DataService } from './data.service';
import { Response } from './../Models/token';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DelivererService {

  private url: string = environment.url
  
  constructor(
    private dataServ: DataService
    ) { }

    public findDeliverers(): Observable<Response>{
      return this.dataServ.getData(`${this.url}/deliverers`);
    }

}
