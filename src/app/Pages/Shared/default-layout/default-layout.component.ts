import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public name: string = "Njaratiana Martinah RAHALINJANAHARY";
  public date: string = new Date().getFullYear().toString();
  constructor() { }

  ngOnInit(): void {
  }

}
