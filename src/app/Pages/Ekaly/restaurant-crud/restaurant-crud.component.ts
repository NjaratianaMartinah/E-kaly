import { ProfilService } from './../../../Services/profil.service';
import { Profil } from './../../../Models/profil';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-crud',
  templateUrl: './restaurant-crud.component.html',
  styleUrls: ['./restaurant-crud.component.css']
})
export class RestaurantCrudComponent implements OnInit {

  public restaurantForm! : FormGroup;
  public indice!: number;
  public restaurant: Profil = new Profil("",1,"","","","","","");
  public restos: Array<Profil> = [
    new Profil("1",1,"resto1@gmail.com","123456","Smokey House Burger","Smokey House Burger","20131","burger-08.png"),
    new Profil("2",1,"resto1@gmail.com","123456","Resto1","Resto1","20131","burger-08.png")
  ]

  ngOnInit(): void {
  }

  constructor( 
    private builder : FormBuilder,
    private profilServ: ProfilService
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
    this.restaurant = new Profil("",1,"","","","","","");
    this.setForm();
  }
  
  public getFormValue(){
   if(this.restaurantForm.valid) return this.restaurantForm.value;
  }

  public addProfil(): void{
    let profil: Profil = this.getFormValue();
    console.log(profil);
    this.profilServ.createProfil(profil).subscribe(
      (res: Response) =>{alert("Restaurant ajouté")},
      () => {alert("Une erreur s'est produit, veuillez réessayer!")},
    );
  }

  confirmDelete(ind: number){
    this.indice = ind;
  }

  setModalStatus(ind: number){
    this.indice = ind;
    this.restaurant = this.restos[this.indice];
    this.setForm();
  }


  public deleteRestaurant(){
    
  }

}
