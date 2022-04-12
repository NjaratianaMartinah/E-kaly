import { Response } from './../../../Models/token';
import { SharedService } from './../../../Services/shared.service';
import { CommandService } from './../../../Services/command.service';
import { Cart } from 'src/app/Models/cart';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Profil } from 'src/app/Models/profil';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  public commands!:Array<Cart>;
  public commandsDone!:Array<Cart>;
  public commandsDelivery!:Array<Cart>;
  public user!: Profil;

  public order:Array<any> = [
    {"id":1, "nom":"Njaratiana"},
    {"id":1, "nom":"Martinah"},
    {"id":1, "nom":"Rahalinjanahary"},
  ];

  public orderDone:Array<any> = [
    {"id":1, "nom":"Tahiana"},
    {"id":1, "nom":"Martinah"},
    {"id":1, "nom":"Rakotondramanana"},
  ];

    constructor(
    private commandeServ: CommandService,
    private sharedServ: SharedService  
  ) { }
  
  ngOnInit(): void {
    this.getDelivererCommands();
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<Cart[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getDelivererCommands(){
    this.user = this.sharedServ.getUserLocal();
    this.commandeServ.findDelivererCommands(this.user.id).subscribe((res: Response) => {
      if(res.code === 202){
        let str = JSON.stringify(res.data);
        this.commands = JSON.parse(str);
        this.commandsDone = JSON.parse(str);
        this.commandsDelivery = JSON.parse(str);
      }
    });
  }

}
