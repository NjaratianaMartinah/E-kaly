import { DragDropComponent } from './Pages/Livreur/drag-drop/drag-drop.component';
import { PanierComponent } from './Pages/Client/panier/panier.component';
import { MenuComponent } from './Pages/Client/menu/menu.component';
import { DefaultLayoutComponent } from './Pages/Shared/default-layout/default-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Shared/login/login.component';
import { RestaurantCrudComponent } from './Pages/Shared/restaurant-crud/restaurant-crud.component';
import { CommandesComponent } from './Pages/Ekaly/commandes/commandes.component';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent
  },
  { 
    path: 'acceuil',
    component: DefaultLayoutComponent,
    children:[
      {
        path:"restaurants/:id",
        component:MenuComponent
      },
      // {
      //   path:"restaurants/:id",
      //   component:PlatsCrudComponent
      // },
      {
        path:"panier",
        component:PanierComponent
      },
      {
        path:"restaurants",
        component:RestaurantCrudComponent
      },
      {
        path:"commandes",
        component:CommandesComponent
      },
      {
        path:"drag",
        component:DragDropComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
