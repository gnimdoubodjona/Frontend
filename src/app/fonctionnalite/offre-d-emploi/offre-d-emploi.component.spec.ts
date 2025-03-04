import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreDEmploiComponent } from './offre-d-emploi.component';

describe('OffreDEmploiComponent', () => {
  let component: OffreDEmploiComponent;
  let fixture: ComponentFixture<OffreDEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffreDEmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreDEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
