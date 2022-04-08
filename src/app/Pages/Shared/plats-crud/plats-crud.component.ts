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
  public message!: string ;
  public platesForm! : FormGroup;
  public indice!: number;
  public restaurant!: Profil;
  public plat: Plat =  new Plat("Burger",100,200,"Burger Burger","Burger");
  public formData: FormData = new FormData() ;
  public action: boolean = true; //true pour l'ajout, false pour la modif
  public plates: Array<Plat> | undefined = [
    new Plat("Burger",100,200,"Burger Burger","Burger"),
  ] 

  ngOnInit(): void {
    this.getRestaurantPlates();
  }

  constructor( 
    private builder : FormBuilder,
    private profilServ: ProfilService,
    private restaurantServ: RestaurantService,
    private router : Router,
    private activatedRoute : ActivatedRoute
     ) {
      this.setForm();
     }

  public setForm(): void{
    this.platesForm = this.builder.group({
      name : [this.plat.name,Validators.required],
      price : [this.plat.price,Validators.required],
      bought : [this.plat.bought,Validators.required],
      description : [this.plat.description,Validators.required],
      photo:[this.plat.photo,Validators.required]
    });
  }

  public initForm(): void{
    // this.restaurant = new Profil("",PROFIL_TYPE.restaurant,"","","","","","");
    // this.restaurant = new Profil("",PROFIL_TYPE.restaurant,"pho@gmail.com","123456","Pho","Pho","12343","");
    this.plat =  new Plat("Burger",100,200,"Burger Burger","Burger"),
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
    let profil: Profil = this.getFormValue();
    this.formData.set("restaurant",JSON.stringify(profil));
    console.log(this.formData.get("restaurant"));
    console.log(this.formData.get("photo"));
    if(this.action){
        this.profilServ.createProfil(this.formData).subscribe((res: Response) =>console.log(res));
    }else{
      this.profilServ.editProfil(this.formData).subscribe((res: Response) => console.log(res));
    }
  }

  public selectFile(event: any){
    let file = event.target.files;
    this.formData.set("photo", file[0]);
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
