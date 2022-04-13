import { Globale } from './Models/global';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/Shared/login/login.component';
import { DefaultLayoutComponent } from './Pages/Shared/default-layout/default-layout.component';
import { MenuComponent } from './Pages/Client/menu/menu.component';
import { PanierComponent } from './Pages/Client/panier/panier.component';
import { RestaurantCrudComponent } from './Pages/Shared/restaurant-crud/restaurant-crud.component';
import { PlatsCrudComponent } from './Pages/Shared/plats-crud/plats-crud.component';
import { CommandesComponent } from './Pages/Ekaly/commandes/commandes.component';
import { DragDropComponent } from './Pages/Livreur/drag-drop/drag-drop.component';
import { CommandListComponent } from './Pages/Restaurant/command-list/command-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultLayoutComponent,
    MenuComponent,
    PanierComponent,
    RestaurantCrudComponent,
    PlatsCrudComponent,
    CommandesComponent,
    DragDropComponent,
    CommandListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    Globale
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
