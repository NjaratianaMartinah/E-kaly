import { SharedService } from './../../../Services/shared.service';
import { Response } from './../../../Models/token';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Models/cart';
import { CommandService } from 'src/app/Services/command.service';
import { Profil } from 'src/app/Models/profil';

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {

  
  public commands: Array<Cart> = [];
  public cart!: Cart;
  public user!: Profil;

  constructor(
    private commandeServ: CommandService,
    private sharedServ: SharedService
  ) { }

  ngOnInit(): void {
    this.getLocalUser();
    this.findRestoCommand();
  }

  getLocalUser(): void{
    this.user = this.sharedServ.getUserLocal();
  }

  findRestoCommand(): void{
    this.commandeServ.findRestoCommands(this.user).subscribe((res: Response) => {
        if(res.code === 202){
          this.commands = res.data;
          console.log(this.commands);
        }
      });
    }

  detail(command: Cart): void{
    this.cart = command;
  }

}
