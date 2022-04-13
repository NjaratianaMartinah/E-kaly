import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public title:string = 'Ekaly';
  public footer:string = "Njaratiana Martinah";

  ngOnInit(): void {
  }

}
