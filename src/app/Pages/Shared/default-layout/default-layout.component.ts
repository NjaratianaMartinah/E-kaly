import { Globale } from './../../../Models/global';
import { ProfilService } from 'src/app/Services/profil.service';
import { SharedService } from './../../../Services/shared.service';
import { Profil } from 'src/app/Models/profil';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  public name: string = "Njaratiana Martinah RAHALINJANAHARY";
  public date: string = new Date().getFullYear().toString();
  public user!: Profil;
  public isClient!: boolean;
  public isRestaurant!: boolean;
  public isEkaly!: boolean;
  public isDeliverer!: boolean;
  public countAricle: number = new Globale().countAricle;

  constructor(
    private sharedServ: SharedService,
    private profilServ: ProfilService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.getLocalUser();
  }

  getLocalUser(): void{
    this.user = this.sharedServ.getUserLocal();
    this.isClient = this.profilServ.isClient(this.user.type);
    this.isRestaurant = this.profilServ.isRestaurant(this.user.type);
    this.isEkaly = this.profilServ.isEkaly(this.user.type);
    this.isDeliverer = this.profilServ.isDeliverer(this.user.type);
  }

  logout(): void{
    this.sharedServ.clearLocalStorage();
    this.route.navigate([""]);
  }


}
