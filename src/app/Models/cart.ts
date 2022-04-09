import { Order } from './order';
import { Profil } from './profil'

export class Cart {
  public id!: string;
  public client : Profil;
  public order: Array<Order>;
  public totalbuyprice!: number;
  public totalsellprice!: number;
  public date!: Date ;
  public status!: number;
  public livreur!: Profil;
  public frais!: number;

  constructor(client: Profil, order:Array<Order>){
    this.client = client;
    this.order = order;
    this.frais = 5000;
    this.totalbuyprice = 0;
    this.totalsellprice = 0;
  }
}
