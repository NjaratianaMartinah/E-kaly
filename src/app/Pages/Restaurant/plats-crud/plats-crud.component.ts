import { SharedService } from './../../../Services/shared.service';
import { Response } from './../../../Models/token';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profil } from 'src/app/Models/profil';
import { Plat } from 'src/app/Models/plat';
import { RestaurantService } from 'src/app/Services/restaurant.service';

@Component({
  selector: 'app-plats-crud',
  templateUrl: './plats-crud.component.html',
  styleUrls: ['./plats-crud.component.css']
})
export class PlatsCrudComponent implements OnInit {

  
  public apiUrl: string = environment.upload;
  public platesForm! : FormGroup;
  public restaurant!: Profil;
  public plat: Plat =  new Plat("","Burger",100,200,"Burger Burger","Burger");
  public formData: FormData = new FormData() ;
  public plates: Array<Plat> =[];

  ngOnInit(): void {
    this.getRestaurantPlates();
  }

  constructor( 
    private builder : FormBuilder,
    private restaurantServ: RestaurantService,
    private sharedServ: SharedService
     ) {
      this.setForm();
     }

  getRestaurantPlates(): void{
    this.restaurant  = this.sharedServ.getUserLocal();
    this.restaurant?.plats?.forEach(plat => {
        plat.avatar = this.apiUrl.concat("/"+plat.avatar);
    });
    this.plates = this.restaurant.plats;

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
    this.setForm();
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
    this.restaurantServ.addPlat(this.formData).subscribe((res: Response) =>{
      if(res.code === 202){
        let newPlat = res.data;
        newPlat.avatar = this.apiUrl.concat("/"+newPlat.avatar);
        this.plates?.push(newPlat);
        this.restaurant.plats = this.plates;
        localStorage.setItem("profil",JSON.stringify(this.restaurant));
      }
    });
  }

  public selectFile(event: any){
    let file = event.target.files;
    this.formData.set("avatar", file[0]);
  }

  confirmDelete(plat: Plat){
    this.plat = plat;
  }


  public deletePlat(){
    this.restaurantServ.deletePlat(this.restaurant).subscribe((res: Response) => {
        console.log(res);
        if(res.code === 202){
          let ind : number = this.plates?.findIndex((plat) => plat.id = this.plat.id);
          this.plates?.splice(ind);
        }
      });
  }

}
