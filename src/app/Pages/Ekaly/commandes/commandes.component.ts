import { DelivererService } from './../../../Services/deliverer.service';
import { Response } from './../../../Models/token';
import { CommandService } from './../../../Services/command.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Models/cart';
import { Profil } from 'src/app/Models/profil';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  public commands: Array<Cart> = [];
  public cart!: Cart;
  public deliverers: Array<Profil> = [];
  public deliverer!: Profil;

  constructor(
    private commandeServ: CommandService,
    private delivererServ: DelivererService
  ) { }

  ngOnInit(): void {
    this.findEkalyCommand();
    this.findDeliverer();
  }

  findEkalyCommand(){
    this.commandeServ.findEkalyCommands()
      .subscribe((res: Response) => {
        if(res.code === 202){
          this.commands = res.data;
          console.log(this.commands);
        }
      });
  }

  findDeliverer(){
    this.delivererServ.findDeliverers().subscribe((res: Response) =>{
      if(res.code === 202){
        this.deliverers = res.data;
        console.log(this.deliverers);
      }
    });
    
  }

  changeDeliverer(event: any){
    let ind = event.target.value;
    console.log(ind);
    this.deliverer = this.deliverers[ind];
    console.log(this.deliverer);
  }

  assignCommand(){
    if(this.deliverer != null){
      this.deliverer.password="password";
      let request={
        orderId: this.cart.id,
        deliverer: this.deliverer
      }
      this.commandeServ.AssignCommandDeliverer(request).subscribe((res: Response) =>{
        if(res.code === 202){
            console.log(res.message);
        }
      });
    }
  }


  detail(command: Cart){
    this.cart = command;
  }

}
