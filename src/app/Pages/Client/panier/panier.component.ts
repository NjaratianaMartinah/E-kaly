import { Response } from './../../../Models/token';
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
  public cartExist: boolean = true;

  constructor(
    private cartServ: CartService
  ) { }

  ngOnInit(): void {
    this.checkCart();
  }

  checkCart(){
    if(!this.cartServ.checkCart()){
      this.cartExist = true;
      this.cart = this.cartServ.getCart();
      this.totalWithFrais = this.cartServ.setTotalWithFrais(this.cart);
    }else{
      this.cartExist = false;
      this.message = "Vous n'avez rien dans le panier!!!";
    }
  }

  setQuantity(event: any, index: number){
    let quantity: number = Number.parseInt(event.target.value);
    this.cart.plats[index] = this.cartServ.setQuantityOrder(this.cart.plats[index],quantity);
    this.cartServ.setTotalPrice(this.cart);
    this.totalWithFrais = this.cartServ.setTotalWithFrais(this.cart);
    this.cartServ.setCart(this.cart);
  }

  removeToCart(indice: number){
   this.cart.plats.splice(indice,1);
   this.cartServ.setTotalPrice(this.cart);
   this.totalWithFrais = this.cartServ.setTotalWithFrais(this.cart);
   this.cartServ.setCart(this.cart);
  }

  confirmCommand(){
    this.cartServ.addCommand(this.cart).subscribe((res: Response) => {
        if(res.code === 202){
          this.message = "Votre commande a été validé";
          this.cartExist = false;
          this.cart = this.cartServ.getCart();
        }
      });
  }

}
