import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueProduitComponent } from './boutique-produit.component';

describe('BoutiqueProduitComponent', () => {
  let component: BoutiqueProduitComponent;
  let fixture: ComponentFixture<BoutiqueProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoutiqueProduitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
