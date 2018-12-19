import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriuserComponent } from './galeriuser.component';

describe('GaleriuserComponent', () => {
  let component: GaleriuserComponent;
  let fixture: ComponentFixture<GaleriuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
