import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCandidatureComponent } from './gestion-candidature.component';

describe('GestionCandidatureComponent', () => {
  let component: GestionCandidatureComponent;
  let fixture: ComponentFixture<GestionCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
