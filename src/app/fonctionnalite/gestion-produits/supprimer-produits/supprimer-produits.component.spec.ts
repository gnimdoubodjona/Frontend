import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerProduitsComponent } from './supprimer-produits.component';

describe('SupprimerProduitsComponent', () => {
  let component: SupprimerProduitsComponent;
  let fixture: ComponentFixture<SupprimerProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupprimerProduitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
