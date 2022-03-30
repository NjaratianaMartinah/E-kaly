import { PanierComponent } from './Pages/Client/panier/panier.component';
import { MenuComponent } from './Pages/Client/menu/menu.component';
import { DefaultLayoutComponent } from './Pages/Shared/default-layout/default-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Shared/login/login.component';

const routes: Routes = [
  { 
    path: 'ekaly/login', 
    component: LoginComponent
  },
  { 
    path: 'ekaly/Accueil', 
    component: DefaultLayoutComponent,
    children:[
      {
        path:"",
        component:MenuComponent
      },
      {
        path:"Panier",
        component:PanierComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
