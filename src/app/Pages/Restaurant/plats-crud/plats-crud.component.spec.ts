import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsCrudComponent } from './plats-crud.component';

describe('PlatsCrudComponent', () => {
  let component: PlatsCrudComponent;
  let fixture: ComponentFixture<PlatsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
