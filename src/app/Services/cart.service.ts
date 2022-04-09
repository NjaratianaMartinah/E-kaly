import { SharedService } from './shared.service';
import { Cart } from './../Models/cart';
import { Injectable } from '@angular/core';
import { Order } from '../Models/order';
import { Profil } from '../Models/profil';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
  private sharedServ: SharedService
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
      let index = cart.order.findIndex((element:Order) => element.plat._id === order.plat._id);
      console.log(index);
      if(index === -1){
        cart.order.push(order);
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
    cart.order.forEach(order => {
      cart.totalbuyprice = cart.totalbuyprice + order.totalbuyprice;
      cart.totalsellprice = cart.totalsellprice + order.totalsellprice;
    });
  }

  setTotalWithFrais(cart: Cart){
    return (cart.totalsellprice + cart.frais);
  }
  
}