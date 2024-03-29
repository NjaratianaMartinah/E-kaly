import { PROFIL_TYPE } from 'src/app/Models/shared';
import { SharedService } from './../../../Services/shared.service';
import { environment } from 'src/environments/environment';
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
  public restos: Array<Profil> =[];
  public isClient!: boolean;
  public isEkaly!: boolean;
  public user!: Profil;

  constructor( 
    private builder : FormBuilder,
    private profilServ: ProfilService,
    private restaurantServ: RestaurantService,
    private router : Router,
    private sharedServ: SharedService
     ) {
      this.setForm();
     }

  ngOnInit(): void {
    this.findRestaurants();
  }

  getLocalUser(){
    this.user = this.sharedServ.getUserLocal();
    this.isClient = this.profilServ.isClient(this.user.type);
    this.isEkaly = this.profilServ.isEkaly(this.user.type);
  }

  public setForm(): void{
    this.restaurantForm = this.builder.group({
      firstname : [this.restaurant.firstname,Validators.required],
      phonenumber : [this.restaurant.phonenumber],
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
      this.getLocalUser();
   });
  }

  public getFormValue(){
    return this.restaurantForm.value;
  }

  public addRestaurant(): void{
    let profil: Profil = this.getFormValue();
    profil.type = PROFIL_TYPE.restaurant;
    profil.status = true;
    this.formData.set("restaurant",JSON.stringify(profil));
    if(this.action){
        this.profilServ.createProfil(this.formData).subscribe((res: Response) =>{
          let newResto = res.data;
          newResto.avatar = this.apiUrl.concat("/"+newResto.avatar);
          this.restos.push(newResto);
        });
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
    this.restaurantServ.deleteRestaurant(this.restaurant).subscribe((res: Response) => {
        if(res.code === 202){
          let ind = this.restos.findIndex((resto) => resto.id === this.restaurant.id);
          this.restos.splice(ind);
        }
        this.message = res.message;
      });
  }

  checkPlates(resto: any){
    this.router.navigate(["acceuil/restaurants",resto.id]);
  }

}
