import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseAJourProduitsComponent } from './mise-ajour-produits.component';

describe('MiseAJourProduitsComponent', () => {
  let component: MiseAJourProduitsComponent;
  let fixture: ComponentFixture<MiseAJourProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiseAJourProduitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiseAJourProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
