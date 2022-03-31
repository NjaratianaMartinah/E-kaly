import { Login } from './../../../Models/login';
import { SharedService } from './../../../Services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../../Models/client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginform : FormGroup;
  public signUpForm: FormGroup;
  public email : string ="";
  public login!: Login;
  public hasAccount: boolean = true;
  public client!: Client;
  public clients!:Client[];

  ngOnInit(): void {
  }

  constructor( 
    private builder : FormBuilder,
    private sharedServ: SharedService
     ) { 
    this.loginform = this.builder.group({
      email : ['',Validators.required,Validators.email],
      password : ['',Validators.required]
    });
    this.signUpForm = this.builder.group({
      firstname : [''],
      lastname : [''],
      email : ['',Validators.required,Validators.email],
      password : ['',Validators.required]
    })
  }
  
  public getLoginValue() : void {
    let email = this.loginform.get("username")?.value;
    let password = this.loginform.get("password")?.value;
    this.login = new Login(email,password);
  }

  public getSignUpValue() : void {
    let firstname = this.signUpForm.get("firstname")?.value;
    let lastname = this.signUpForm.get("lastname")?.value;
    let email = this.signUpForm.get("email")?.value;
    let password = this.signUpForm.get("password")?.value;
    this.client = new Client(firstname,lastname,email,password);
  }

  public log(): void{
    this.getLoginValue();
    this.sharedServ.login(this.login)
    .subscribe({
      next: res => alert(JSON.stringify(res)),
      error: err => alert(JSON.stringify(err))
    });
  }


  public signUp(): void{
    this.getSignUpValue();
    // console.log(this.sharedServ.signUp(this.client));
  }

  public findAllClient(): void{
    this.sharedServ.findAll().subscribe({
      error: () => alert('Error on fetching data!'),
      next: (res) => this.clients = res 
    })
  }

  public changeOption(){
    this.hasAccount = !this.hasAccount;
  }

}
