import { ProfilService } from 'src/app/Services/profil.service';
import { SharedService } from './../../../Services/shared.service';
import { Profil } from 'src/app/Models/profil';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private sharedServ: SharedService,
    private profilServ: ProfilService
  ) { }

  ngOnInit(): void {
    this.getLocalUser();
  }

  getLocalUser(){
    this.user = this.sharedServ.getUserLocal();
    this.isClient = this.profilServ.isClient(this.user.type);
  }




}
