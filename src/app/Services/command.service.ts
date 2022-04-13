import { DataService } from './data.service';
import { Response } from './../Models/token';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private url: string = environment.url
  
  constructor(
    private dataServ: DataService
    ) { }

    public findEkalyCommands(): Observable<Response>{
      return this.dataServ.getData(this.url.concat("/orders"));
    }

    public AssignCommandDeliverer(request: any): Observable<Response>{
      return this.dataServ.postData(this.url.concat("/orders/deliverer"),request);
    }

    public findDelivererCommands(profil: any): Observable<Response>{
        return this.dataServ.getData(this.url.concat("/orders/deliverer/"+profil));
    }

    public findRestoCommands(profil: any): Observable<Response>{
      return this.dataServ.getData(this.url.concat("/orders/restaurant/"+profil));
    }

    public updateOrderStatus(order: any): Observable<Response>{
      return this.dataServ.postData(this.url.concat("/orders/status"),order);
    }

}
