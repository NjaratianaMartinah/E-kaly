import { DELIVERING, DELIVERED, ORDER } from './../../../Models/shared';
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

  public orders!:Array<Cart>;
  public ordersDelivering!:Array<Cart>;
  public ordersDelivered!:Array<Cart>;

  public user!: Profil;

    constructor(
    private commandeServ: CommandService,
    private sharedServ: SharedService  
  ) { }
  
  ngOnInit(): void {
    this.getDelivererCommands();
  }

  drop(event: CdkDragDrop<Cart[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
       this.setStatus(event.container.id, event.container.data, event.currentIndex);
    }
  }

  getDelivererCommands(){
    this.user = this.sharedServ.getUserLocal();
    this.commandeServ.findDelivererCommands(this.user.id).subscribe((res: Response) => {
      if(res.code === 202){
        console.log(res.data);
        let str = JSON.stringify(res.data);
        const ordersTemp = JSON.parse(str);
        this.orders  = ordersTemp.filter((order: any) => order.status === ORDER);
        this.ordersDelivering  = ordersTemp.filter((order: any) => order.status === DELIVERING);
        this.ordersDelivered  = ordersTemp.filter((order: any) => order.status === DELIVERED);
      }
    });
  }

  setStatus(containerId: string, data: any, index: number){
    console.log(data);
    if(containerId === "delivering") this.setDelivering(index, data);
    if(containerId === "delivered") this.setDelivered(index, data);
  }

  setDelivering(index: number,data: any){
    let status = {orderId: data[index].id, status: DELIVERING};
    console.log(status);
    this.commandeServ.updateOrderStatus(status).subscribe((res: Response) => {
      console.log(res);
    });
    data[index].status = DELIVERING;
  }

  setDelivered(index: number,data: any){
    let status = {orderId: data[index].id, status: DELIVERED};
    console.log(status);
    this.commandeServ.updateOrderStatus(status).subscribe((res: Response) => {
      console.log(res);
    });
    data[index].status = DELIVERED;
  }

}
