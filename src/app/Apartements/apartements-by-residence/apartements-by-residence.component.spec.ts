import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartementsByResidenceComponent } from './apartements-by-residence.component';

describe('ApartementsByResidenceComponent', () => {
  let component: ApartementsByResidenceComponent;
  let fixture: ComponentFixture<ApartementsByResidenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartementsByResidenceComponent]
    });
    fixture = TestBed.createComponent(ApartementsByResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
