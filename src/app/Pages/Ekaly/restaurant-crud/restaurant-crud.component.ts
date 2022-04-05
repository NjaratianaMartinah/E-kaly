import { ProfilService } from './../../../Services/profil.service';
import { Profil } from './../../../Models/profil';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-crud',
  templateUrl: './restaurant-crud.component.html',
  styleUrls: ['./restaurant-crud.component.css']
})
export class RestaurantCrudComponent implements OnInit {

  public addForm : FormGroup;

  ngOnInit(): void {
  }

  constructor( 
    private builder : FormBuilder,
    private profilServ: ProfilService
     ) { 
    this.addForm = this.builder.group({
      firstname : ['mnjaratiana',Validators.required],
      phonenumber : ['123456',Validators.required],
      email : ['mnjaratiana@gmail.com',Validators.required],
      password : ['123456',Validators.required],
      avatar:[""]
    });
  }
  
  public getAddValue(){
    return this.addForm.value;
  }

  public addProfil(): void{
    let profil: Profil = this.getAddValue();
    console.log(profil);
    this.profilServ.createProfil(profil).subscribe(
      (res: Response) =>{alert("Restaurant ajouté")},
      () => {alert("Une erreur s'est produit, veuillez réessayer!")},
    );
  }

}
