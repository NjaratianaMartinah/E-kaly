import { Response } from './../../../Models/token';
import { Login } from './../../../Models/login';
import { SharedService } from './../../../Services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profil } from '../../../Models/profil';

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

  ngOnInit(): void {
  }

  constructor( 
    private builder : FormBuilder,
    private sharedServ: SharedService
     ) { 
    this.loginform = this.builder.group({
      email : ['mnjaratiana@gmail.com',Validators.required],
      password : ['123456',Validators.required]
    });
    this.signUpForm = this.builder.group({
      firstname : [''],
      lastname : [''],
      email : ['',Validators.required,Validators.email],
      password : ['',Validators.required]
    })
  }
  
  public getLoginValue() : Login {
    let email = this.loginform.get("email")?.value;
    let password = this.loginform.get("password")?.value;
    return new Login(email,password);
  }

  public getSignUpValue() : void {
    let firstname = this.signUpForm.get("firstname")?.value;
    let lastname = this.signUpForm.get("lastname")?.value;
    let email = this.signUpForm.get("email")?.value;
    let password = this.signUpForm.get("password")?.value;
    this.client = new Profil(firstname,lastname,email,password);
  }

  public login(): void{
    let login: Login = this.getLoginValue();
    this.sharedServ.login(login).subscribe(
      (res: Response) =>{this.sharedServ.setToken(res.data?.token);},
      () => {alert("Une erreur s'est produit, veuillez vous reconnecter!")},
    );
  }


  public signUp(): void{
    this.getSignUpValue();
    // console.log(this.sharedServ.signUp(this.client));
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
