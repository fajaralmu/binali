import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListentitasComponent } from './listentitas.component';

describe('ListentitasComponent', () => {
  let component: ListentitasComponent;
  let fixture: ComponentFixture<ListentitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListentitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListentitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
