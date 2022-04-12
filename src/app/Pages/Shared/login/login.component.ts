import { PROFIL_TYPE } from './../../../Models/shared';
import { ProfilService } from './../../../Services/profil.service';
import { Response } from './../../../Models/token';
import { SharedService } from './../../../Services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profil } from '../../../Models/profil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginform : FormGroup;
  public signUpForm: FormGroup;
  public email : string ="";
  public hasAccount: boolean = true;
  public client!: Profil;
  public clients!:Profil[];
  public user!: Profil;

  ngOnInit(): void {}

  constructor( 
    private builder : FormBuilder,
    private sharedServ: SharedService,
    private profilServ: ProfilService,
    private router: Router
     ) { 
    this.loginform = this.builder.group({
      email : ['ekaly@gmail.com',Validators.required],
      password : ['123456',Validators.required]
    });
    this.signUpForm = this.builder.group({
      firstname : [''],
      lastname : [''],
      email : ['',Validators.required,Validators.email],
      password : ['',Validators.required]
    })
  }

  getLocalUser(){
    this.user = this.sharedServ.getUserLocal();
  }
  
  public getLoginValue() : Profil {
    let email = this.loginform.get("email")?.value;
    let password = this.loginform.get("password")?.value;
    return new Profil("",PROFIL_TYPE.client,email,password);
  }

  public getSignUpValue() : void {
    let firstname = this.signUpForm.get("firstname")?.value;
    let lastname = this.signUpForm.get("lastname")?.value;
    let email = this.signUpForm.get("email")?.value;
    let password = this.signUpForm.get("password")?.value;
    this.client = new Profil("",PROFIL_TYPE.client,email,password,firstname,lastname);
  }

  public login(): void{
    let login: Profil = this.getLoginValue();
    this.sharedServ.login(login).subscribe((res: Response) =>{
        if(res.code === 202){
          this.user = res.data;
          this.sharedServ.setUserLocal(this.user);
          if(this.profilServ.isClient(this.user.type)){this.router.navigate(['/acceuil/restaurants']);}
          if(this.profilServ.isEkaly(this.user.type)){ this.router.navigate(['/acceuil/commandes']);}
          if(this.profilServ.isDeliverer(this.user.type)){ this.router.navigate(['/acceuil/drag']);}
        }else{
          alert(res.message);
        }
      },
    );
  }

  public signUp(): void{
    this.getSignUpValue();
    this.sharedServ.register(this.client) .subscribe((res: Response) =>{
      if(res.code === 202){
        location.reload();
      }
   });
  }

  public findAllClient(): void{
    this.sharedServ.findAll().subscribe({
      next: (res: Profil[]) => this.clients = res ,
      error: () => alert('Error on fetching data!'),
    })
  }

  public changeOption(): void{
    this.hasAccount = !this.hasAccount;
  }

}
