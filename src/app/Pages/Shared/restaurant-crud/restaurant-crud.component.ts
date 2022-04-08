import { environment } from 'src/environments/environment';
import { PROFIL_TYPE } from './../../../Models/shared';
import { RestaurantService } from './../../../Services/restaurant.service';
import { Response } from './../../../Models/token';
import { ProfilService } from './../../../Services/profil.service';
import { Profil } from './../../../Models/profil';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-crud',
  templateUrl: './restaurant-crud.component.html',
  styleUrls: ['./restaurant-crud.component.css']
})
export class RestaurantCrudComponent implements OnInit {

  public apiUrl: string = environment.upload;
  public message!: string ;
  public restaurantForm! : FormGroup;
  public indice!: number;
  public restaurant: Profil = new Profil("",PROFIL_TYPE.restaurant,"pho@gmail.com","123456","Pho","Pho","12343","");
  public formData: FormData = new FormData() ;
  public action: boolean = true; //true pour l'ajout, false pour la modif
  public restos: Array<Profil> = [
    new Profil("1",PROFIL_TYPE.restaurant,"resto1@gmail.com","123456","Smokey House Burger","Smokey House Burger","20131","burger-08.png"),
    new Profil("2",PROFIL_TYPE.restaurant,"resto1@gmail.com","123456","Resto1","Resto1","20131","burger-08.png")
  ]

  ngOnInit(): void {
    this.findRestaurants();
  }

  constructor( 
    private builder : FormBuilder,
    private profilServ: ProfilService,
    private restaurantServ: RestaurantService,
    private router : Router
     ) {
      this.setForm();
     }

  public setForm(): void{
    this.restaurantForm = this.builder.group({
      firstname : [this.restaurant.firstname,Validators.required],
      phonenumber : [this.restaurant.phonenumber,Validators.required],
      email : [this.restaurant.email,Validators.required],
      password : [this.restaurant.password,Validators.required],
      avatar:[this.restaurant.avatar,Validators.required]
    });
  }

  public initForm(): void{
    this.restaurant = new Profil("",PROFIL_TYPE.restaurant,"pho@gmail.com","123456","Pho","Pho","12343","");
    this.action = true;
    this.setForm();
  }
  
  public findRestaurants(){
    this.restaurantServ.findRestaurants().subscribe((res : Response) =>{ 
      this.restos = res.data
      this.restos.forEach(resto => {
      resto.avatar = this.apiUrl.concat("/"+resto.avatar);
      });
      console.log(this.restos);
   });
  }

  public getFormValue(){
    console.log(this.restaurantForm.value);
    return this.restaurantForm.value;
  }

  public addRestaurant(): void{
    let profil: Profil = this.getFormValue();
    this.formData.set("restaurant",JSON.stringify(profil));
    console.log(this.formData.get("restaurant"));
    console.log(this.formData.get("avatar"));
    if(this.action){
        this.profilServ.createProfil(this.formData).subscribe((res: Response) =>console.log(res));
    }else{
      this.profilServ.editProfil(this.formData).subscribe((res: Response) => console.log(res));
    }
  }

  public selectFile(event: any){
    let file = event.target.files;
    this.formData.set("avatar", file[0]);
  }

  confirmDelete(resto : Profil){
    this.restaurant = resto;
  }

  setModalStatus(resto: Profil){
    this.action = false;
    this.restaurant = resto
    this.setForm();
  }


  public deleteRestaurant(){
    console.log(this.restaurant);
    this.restaurantServ.deleteRestaurant(this.restaurant)
      .subscribe((res: Response) => {
        console.log(res);
        if(res.code === 202){
          let ind = this.restos.findIndex((resto) => this.restaurant.id = resto.id);
          this.restos.splice(ind);
        }
        this.message = res.message;
      });
  }

  checkPlates(resto: any){
    this.router.navigate(["acceuil/restaurants",resto.id]);
  }

}
