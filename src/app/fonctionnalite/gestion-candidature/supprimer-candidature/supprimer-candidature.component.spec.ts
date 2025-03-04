import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerCandidatureComponent } from './supprimer-candidature.component';

describe('SupprimerCandidatureComponent', () => {
  let component: SupprimerCandidatureComponent;
  let fixture: ComponentFixture<SupprimerCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupprimerCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
