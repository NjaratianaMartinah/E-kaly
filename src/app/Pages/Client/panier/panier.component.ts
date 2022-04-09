import { Order } from './../../../Models/order';
import { CartService } from './../../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Models/cart';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  public cart!: Cart;
  public message: string ="";
  public totalWithFrais: number = 0;

  constructor(
    private cartServ: CartService
  ) { }

  ngOnInit(): void {
    this.checkCart();
  }

  checkCart(){
    if(!this.cartServ.checkCart()){
      this.cart = this.cartServ.getCart();
      console.log(this.cart);
    }else{
      this.message = "Vous n'avez rien dans le panier!!!";
    }
  }

  setQuantity(event: any, index: number){
    console.log(event.target.value);
    let quantity: number = Number.parseInt(event.target.value);
    this.cart.order[index] = this.cartServ.setQuantityOrder(this.cart.order[index],quantity);
    this.cartServ.setTotalPrice(this.cart);
    this.totalWithFrais = this.cartServ.setTotalWithFrais(this.cart);
    this.cartServ.setCart(this.cart);
  }

}
