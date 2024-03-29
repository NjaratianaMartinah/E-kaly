import { DataService } from './data.service';
import { Response } from './../Models/token';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { Cart } from './../Models/cart';
import { Injectable } from '@angular/core';
import { Order } from '../Models/order';
import { Profil } from '../Models/profil';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url: string = environment.url;

  constructor(
  private sharedServ: SharedService,
  private dataServ: DataService
  ) { }

  checkCart(){
    return (localStorage.getItem("cart") == null);
  }

  addToCart(order : Order){
    let cart: Cart;
    if(this.checkCart()){
      let profil : Profil = this.sharedServ.getUserLocal();
      let or = new Array<Order>();
      or.push(order);
      cart = new Cart(profil,or); 
    }else{
      cart = this.getCart();
      let index = cart.plats.findIndex((element:Order) => element.plat._id === order.plat._id);
      if(index === -1){
        cart.plats.push(order);
      }
    }
    this.setTotalPrice(cart);
    this.setCart(cart);
  }

  getCart(): Cart{
    return JSON.parse(localStorage.getItem("cart")  || '{}');
  }

  setCart(cart: Cart){
    localStorage.setItem("cart",JSON.stringify(cart));
  }

  setQuantityOrder(order: Order, quantity: number): Order{
    order = new Order(order.plat, quantity);
    return order;
  }

  setTotalPrice(cart: Cart){
    cart.totalbuyprice = 0;
    cart.totalsellprice = 0;
    cart.plats.forEach(order => {
      cart.totalbuyprice = cart.totalbuyprice + order.totalbuyprice;
      cart.totalsellprice = cart.totalsellprice + order.totalsellprice;
    });
  }

  setTotalWithFrais(cart: Cart){
    return (cart.totalsellprice + cart.frais);
  }

  public addCommand(cart: Cart): Observable<Response>{ 
    return this.dataServ.postData(`${this.url}/orders`, cart);
  } 

  
}
