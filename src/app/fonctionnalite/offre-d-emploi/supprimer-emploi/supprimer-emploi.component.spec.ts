import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerEmploiComponent } from './supprimer-emploi.component';

describe('SupprimerEmploiComponent', () => {
  let component: SupprimerEmploiComponent;
  let fixture: ComponentFixture<SupprimerEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupprimerEmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
