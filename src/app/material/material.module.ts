import {NgModule} from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  exports: [
    A11yModule,
    DragDropModule,
    MatCardModule,
    OverlayModule
  ]
})
export class MaterialModule { }


