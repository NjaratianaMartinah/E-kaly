import { Response } from './../../../Models/token';
import { RestaurantService } from './../../../Services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Profil } from 'src/app/Models/profil';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurant!: Profil;
  constructor(
    private activRoute: ActivatedRoute,
    private restoServ: RestaurantService
  ) { }

  ngOnInit(): void {
    this.getPRestaurant();
  }

  getPRestaurant(){
    this.restoServ.findRestaurantById(this.activRoute.snapshot.paramMap.get("id"))
      .subscribe((res: Response) =>{
        console.log(res);
          if(res.code === 202){
            this.restaurant = res.data;
          }
        }
       );
  }

}
