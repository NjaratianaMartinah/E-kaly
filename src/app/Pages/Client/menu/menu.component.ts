import { Globale } from './../../../Models/global';
import { Order } from './../../../Models/order';
import { CartService } from './../../../Services/cart.service';
import { environment } from 'src/environments/environment';
import { Plat } from 'src/app/Models/plat';
import { Response } from './../../../Models/token';
import { RestaurantService } from './../../../Services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profil } from 'src/app/Models/profil';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurant!: Profil;
  plats: Array<Plat> | undefined= [];
  uploadUrl: string = environment.upload;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantServ: RestaurantService,
    private cartServ: CartService
  ) { }

  ngOnInit(): void {
    this.getRestaurantPlates();
  }

  getRestaurantPlates(){
    this.restaurantServ.findRestaurantById(this.activatedRoute.snapshot.paramMap.get("id"))
      .subscribe((res: Response) =>{
        console.log(res);
          if(res.code === 202){
            this.restaurant = res.data;
            this.plats = this.restaurant.plats;
            console.log(this.restaurant);
          }
        }
       );
  }

  addToCart(plat: Plat){
    plat.parentResto = this.restaurant.id;
    let order : Order = new Order(plat,1);
    this.cartServ.addToCart(order);
    console.log(JSON.parse(localStorage.getItem("cart") || "{}"));
  }

}
