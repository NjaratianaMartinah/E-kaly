import { Response } from './../../../Models/token';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profil } from 'src/app/Models/profil';
import { PROFIL_TYPE } from 'src/app/Models/shared';
import { Plat } from 'src/app/Models/plat';
import { ProfilService } from 'src/app/Services/profil.service';
import { RestaurantService } from 'src/app/Services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plats-crud',
  templateUrl: './plats-crud.component.html',
  styleUrls: ['./plats-crud.component.css']
})
export class PlatsCrudComponent implements OnInit {

  
  public apiUrl: string = environment.upload;
  public platesForm! : FormGroup;
  public indice!: number;
  public restaurant!: Profil;
  public plat: Plat =  new Plat("","Burger",100,200,"Burger Burger","Burger");
  public formData: FormData = new FormData() ;
  public action: boolean = true; //true pour l'ajout, false pour la modif
  public plates: Array<Plat> | undefined = [
    new Plat("","Burger",100,200,"Burger Burger","Burger"),
  ] 

  ngOnInit(): void {
    this.getRestaurantPlates();
  }

  constructor( 
    private builder : FormBuilder,
    private restaurantServ: RestaurantService,
    private activatedRoute : ActivatedRoute
     ) {
      this.setForm();
     }

  public setForm(): void{
    this.platesForm = this.builder.group({
      designation : [this.plat.designation,Validators.required],
      sellprice : [this.plat.sellprice,Validators.required],
      buyprice : [this.plat.buyprice,Validators.required],
      description : [this.plat.description,Validators.required],
      avatar:[this.plat.avatar,Validators.required]
    });
  }

  public initForm(): void{
    this.plat =  new Plat("","Burger",100,200,"Burger Burger",""),
    this.action = true;
    this.setForm();
  }

  getRestaurantPlates(){
    this.restaurantServ.findRestaurantById(this.activatedRoute.snapshot.paramMap.get("id"))
      .subscribe((res: Response) =>{
        console.log(res);
          if(res.code === 202){
            this.restaurant = res.data;
            this.plates = this.restaurant.plats;
            console.log(this.restaurant);
          }
        }
       );
  }
  
  

  public getFormValue(){
    console.log(this.platesForm.value);
    return this.platesForm.value;
  }

  public addPlate(): void{
    let plat: Plat = this.getFormValue();
    this.formData.set("id",this.restaurant.id);
    this.formData.set("plat",JSON.stringify(plat));
    console.log(this.formData.get("restaurant"));
    if(this.action){
        this.restaurantServ.addPlat(this.formData).subscribe((res: Response) =>console.log(res));
    }else{
      // this.restaurantServ.editPlat(this.formData).subscribe((res: Response) => console.log(res));
    }
  }

  public selectFile(event: any){
    let file = event.target.files;
    this.formData.set("avatar", file[0]);
  }

  confirmDelete(plat: Plat){
    this.plat = plat;
  }

  setModalStatus(plat: Plat){
    this.action = false;
    this.plat = plat
    this.setForm();
  }


  // public deletePlat(){
  //   this.restaurantServ.deletePlat(this.restaurant)
  //     .subscribe((res: Response) => {
  //       console.log(res);
  //       if(res.code === 202){
  //         let ind = this.restos.findIndex((resto) => this.restaurant.id = resto.id);
  //         this.restos.splice(ind);
  //       }
  //       this.message = res.message;
  //     });
  // }

  // checkPlates(resto: any){
  //   this.router.navigate(["acceuil/restaurants",resto.id]);
  // }


}
